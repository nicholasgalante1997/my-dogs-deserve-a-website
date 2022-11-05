pub mod webapp_client {
    use crate::file_client::file_reader;

    pub fn get_static_asset_as_lossy_string(filename: &str) -> String {
        let default_file_not_found_null_string = String::new();
        let static_asset_file_op_result = file_reader::read(filename);
        let static_asset_file_as_string =
            static_asset_file_op_result.unwrap_or(default_file_not_found_null_string);
        static_asset_file_as_string
    }

    pub fn get_html_index_file_absolute_path() -> &'static str {
        "webapp/build/index.html"
    }

    pub fn get_js_bundle_file_absolute_path() -> &'static str {
        "webapp/build/bundle.js"
    }
}
