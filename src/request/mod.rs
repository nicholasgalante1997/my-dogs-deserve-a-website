pub mod http_request_min {

    use crate::http_constants::get_crlf;
    use std::{borrow::Cow, collections::HashMap};

    #[derive(Serialize, Deserialize, Debug)]
    pub struct HttpRequest {
        pub method: String,
        pub headers: HashMap<String, String>,
        pub path: String,
        pub data: String,
    }

    impl HttpRequest {
        pub fn get_header_by_key(&self, key: String) -> String {
            let header_option = self.headers.get(&key);
            let header_value = match header_option {
                Some(header_val) => header_val.clone(),
                None => String::new(),
            };
            header_value
        }
    }

    pub fn parse_http_request_from_buffer(req_buffer: &Cow<str>) -> HttpRequest {
        println!("Request: {} \n", req_buffer);

        let http_request_array: Vec<&str> = req_buffer.split("\n").collect();

        let protocol_line_option = http_request_array.get(0);
        let protocol_line = match protocol_line_option {
            Some(req_string_protocol_line) => req_string_protocol_line,
            None => "GET / HTTP/1.1",
        };

        let protocol_line_split_on_whitespace: Vec<&str> = protocol_line.split(" ").collect();

        let http_req_method_option = protocol_line_split_on_whitespace.get(0);
        let http_req_method = match http_req_method_option {
            Some(method) => *method,
            None => "GET",
        };

        let http_req_path_option = protocol_line_split_on_whitespace.get(1);
        let http_req_path = match http_req_path_option {
            Some(path) => *path,
            None => "/",
        };

        let http_req_method_safe_string = String::from(http_req_method);
        println!("Http Method: {http_req_method_safe_string}");

        let http_req_path_safe_string = String::from(http_req_path);
        println!("Http Req Pathname: {http_req_path_safe_string}");

        let crlf = get_crlf();
        let segmented_req_on_line_feed_vec: Vec<&str> = req_buffer.split(crlf).collect();

        // index 0 is the protocol line
        // index of segmented_req.len() - 1 is http-body
        let mut headers: HashMap<String, String> = HashMap::new();
        let default_null_str = "";
        let default_null_string = String::new();
        let len = segmented_req_on_line_feed_vec.len() - 2;
        let mut header_index: usize = 1;

        while header_index < len {
            let header_option = segmented_req_on_line_feed_vec.get(header_index);
            let header_str = *header_option.unwrap();
            let header_str_vec: Vec<&str> = header_str.split(": ").collect();
            let header_str_key = *header_str_vec.get(0).unwrap_or(&default_null_str);
            let header_str_value = *header_str_vec.get(1).unwrap_or(&default_null_str);

            let should_add_header = header_str_key != "" && header_str_value != "";

            if should_add_header {
                let header_string_key = String::from(header_str_key);
                let header_string_value = String::from(header_str_value);

                headers.insert(header_string_key, header_string_value);
            }
            header_index += 1;
        }

        println!("HttpRequest - Headers: {:#?}", headers);

        let request_body_str = *segmented_req_on_line_feed_vec
            .get(len + 1)
            .unwrap_or(&default_null_str);
        let serialized_request_body =
            serde_json::to_string(&request_body_str).unwrap_or(default_null_string);

        HttpRequest {
            method: String::from(http_req_method),
            path: String::from(http_req_path),
            headers,
            data: serialized_request_body,
        }
    }
}
