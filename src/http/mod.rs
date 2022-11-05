pub mod http_base_kit {
    pub mod http_constants {
        pub fn get_crlf() -> &'static str {
            "\r\n"
        }

        pub fn get_success_get_protocol_http_prefix() -> String {
            let mut http_head = String::from("HTTP/1.1 200 OK");
            let crlf = get_crlf();
            http_head.push_str(crlf);
            http_head
        }

        pub fn get_error_server_internal_protocol_http_prefix() -> String {
            let mut http_head = String::from("HTTP/1.1 500 INTERNAL SERVER ERROR");
            let crlf = get_crlf();
            http_head.push_str(crlf);
            http_head
        }
    }
}
