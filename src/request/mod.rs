pub mod http_request_min {
    pub struct HttpRequest {
        method: String,
        headers: Vec<(String, String)>,
        path: String,
        data: String
    }
}