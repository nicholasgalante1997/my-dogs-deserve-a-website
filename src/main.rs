use std::io::prelude::*;
use std::net::TcpListener;
use std::net::TcpStream;

#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;

use crate::env::environment;
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

    println!("Formatted HttpRequestObject: {:#?}", http_request);

    let response = "HTTP/1.1 200 OK\r\n\r\n";
    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
