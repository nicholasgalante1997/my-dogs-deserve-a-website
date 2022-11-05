pub mod environment {

    use std::collections::HashMap;
    use std::fs::File;
    use std::io::Error;
    use std::io::Read;

    pub fn get_local_environment_variables() -> Result<HashMap<String, String>, Error> {
        let mut file = File::open(".env")?;
        let mut file_contents = String::new();
        file.read_to_string(&mut file_contents)?;

        let mut env_var_hash_map: HashMap<String, String> = HashMap::new();

        let env_variables_vec: Vec<&str> = file_contents.split("\n").collect();
        for env_var_string_slice in env_variables_vec.iter() {
            let key_value_vector: Vec<&str> = env_var_string_slice.split("=").collect();
            let key_string = String::from(*key_value_vector.get(0).unwrap());
            let value_string = String::from(*key_value_vector.get(1).unwrap());
            env_var_hash_map.insert(key_string, value_string);
        }

        Ok(env_var_hash_map)
    }

    pub fn get_rust_environment_default() -> String {
        String::from("development")
    }

    pub fn get_stage_default() -> String {
        String::from("local")
    }

    pub fn get_is_local_development() -> bool {
        let default_rust_environment = get_rust_environment_default();
        let default_stage = get_stage_default();

        let env_hash_result = get_local_environment_variables();
        let env_hash = env_hash_result.unwrap();

        let rust_environment_key = String::from("rust_environment");
        let rust_environment_option = env_hash.get(&rust_environment_key);
        let rust_environment = rust_environment_option.unwrap_or(&default_rust_environment);

        let stage_key = String::from("stage");
        let stage_option = env_hash.get(&stage_key);
        let stage = stage_option.unwrap_or(&default_stage);

        let is_local_development =
            rust_environment.as_str() == "development" && stage.as_str() == "local";

        println!("Server Env - Rust Environment : {}", rust_environment);
        println!("Server Env - Stage - {}", stage);

        is_local_development
    }
}
