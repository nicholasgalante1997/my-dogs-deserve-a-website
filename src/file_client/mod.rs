pub mod file_reader {
    use std::fs::File;
    use std::io::Error;
    use std::io::Read;

    pub fn read(filename: &str) -> Result<String, Error> {
        let mut file = File::open(filename)?;
        let mut b: String = String::new();
        file.read_to_string(&mut b)?;
        Ok(b)
    }
}
