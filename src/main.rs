use std::collections::HashMap;
use std::io::prelude::*;
use std::net::TcpListener;
use std::net::TcpStream;

#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;

use crate::env::environment;
use crate::file_client::file_reader;
use crate::http::http_base_kit::http_constants;
use crate::request::http_request_min::parse_http_request_from_buffer;
use crate::response::http_response_min::HttpResponse;

pub mod env;
pub mod file_client;
pub mod http;
pub mod request;
pub mod response;
pub mod webapp_client;

// Local Development Host & Port
const DEVHOST: &str = "0.0.0.0:9000";

// Server Side Logs
const SERVER_STARTED_LOCAL_DEV_LOG: &str =
    "Starting Rust Tcp Server. Attempting to bind to port 9000.";
const SERVER_STARTED_PROD_LOG: &str = "Starting Rust Tcp Server in production environment. Container is attempting to bind to docker network port: 9000";

fn main() {
    let is_local_development = environment::get_is_local_development();

    if is_local_development {
        println!("{SERVER_STARTED_LOCAL_DEV_LOG}");
    } else {
        println!("{SERVER_STARTED_PROD_LOG}");
    }

    let server_result: Result<TcpListener, _> = TcpListener::bind(DEVHOST);

    let server = match server_result {
        Ok(server) => server,
        Err(error) => panic!("Server main thread panicked with err: {}", error),
    };

    let server_started_successfully_log: &str = "Server started! Listening on port 9000;";
    println!("{server_started_successfully_log}");

    for stream in server.incoming() {
        let stream: TcpStream = match stream {
            Ok(stream) => stream,
            Err(error) => panic!("Stream connection closed with an error: {}", error),
        };

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut exceptions: Vec<&str> = vec![];

    let mut buffer_failed_to_write_exception_string = String::new();

    let mut buffer = [0; 1024];

    let bytes_written = stream.read(&mut buffer).unwrap_or_else(|error| -> usize {
        let buffer_exception_string = error.to_string();
        let buffer_exception_slice =
            format!("StreamReadingBufferException: {buffer_exception_string}");
        println!("{buffer_exception_slice}");
        buffer_failed_to_write_exception_string = buffer_exception_string;
        0
    });

    if bytes_written == 0 {
        // we've hit a stream reading exception in this case
        println!("Request buffer mapping recevied interrupt.");
        println!("Request is likely corrupt.");
        println!("Error: Internal Server Error, Stream Read Exception.");
        exceptions.push(&buffer_failed_to_write_exception_string.as_str())
    }

    // store the request in a Clone-on-write<_, String> (smart pointer type)
    let request_buffer = String::from_utf8_lossy(&buffer[..]);
    let http_request = parse_http_request_from_buffer(&request_buffer);

    let path = http_request.path.clone();
    let method = http_request.method.clone();

    let mut status: usize = 200;
    let mut response_header_hash_map: HashMap<String, String> = HashMap::new();

    http_constants::hydrate_headers_with_cors(&mut response_header_hash_map);

    if method.to_ascii_lowercase() == String::from("get") && path == String::from("/") {
        // Content-Type
        response_header_hash_map.insert(
            String::from("Content-Type"),
            String::from("text/html; charset=utf-8"),
        );
    }

    if method.to_ascii_lowercase() == String::from("get") && path == String::from("/bundle.js") {
        // Content-Type
        response_header_hash_map.insert(
            String::from("Content-Type"),
            String::from("application/javascript"),
        );
    }

    let mut body = String::new();

    if method.to_ascii_lowercase() == String::from("get") && path == String::from("/") {
        let html_file_result = file_reader::read("webapp/build/index.html");
        let html_file = html_file_result.unwrap();
        body = html_file;
    } else if method.to_ascii_lowercase() == String::from("get") && path == String::from("/bundle.js") {
        let js_file_result = file_reader::read("webapp/build/bundle.js");
        let js_file = js_file_result.unwrap();
        body = js_file;
    } else if method.to_ascii_lowercase() == String::from("options") {
        // do nothing
    } else {
        // unhandled route
        status = 500;
        let mut error_hash_map: HashMap<String, Vec<&str>> = HashMap::new();
        exceptions.push("UnhandledRouteException: attempt to access an unathorized or non existent asset from the server.");
        error_hash_map.insert(String::from("errors"), exceptions.clone());
        let error_map_json = serde_json::to_string(&error_hash_map).unwrap_or(String::from("{}"));
        body = error_map_json;
    }

    if exceptions.len() > 0 {
        status = 500;
    }

    let http_response: HttpResponse = HttpResponse {
        status,
        headers: response_header_hash_map.clone(),
        body
    };

    let response = http_response.build();

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
