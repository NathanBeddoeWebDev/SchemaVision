use anyhow::Result;
use rusqlite::Connection;
use std::{env, fs, path::Path};

pub fn init() {
    if !db_file_exists() {
        create_db_file();
    }
}

fn create_db_file() {
    let db_path = get_db_path();
    let db_dir = Path::new(&db_path).parent().unwrap();

    if !db_dir.exists() {
        fs::create_dir_all(db_dir).unwrap();
    }
    fs::File::create(db_path).unwrap();
}

pub fn establish_db_connection() -> Connection {
    let db_path = get_db_path().clone();

    Connection::open(db_path.as_str()).unwrap_or_else(|_| panic!("Error connecting to {}", db_path))
}

fn db_file_exists() -> bool {
    let db_path = get_db_path();
    Path::new(&db_path).exists()
}

fn get_db_path() -> String {
    let home_dir = dirs::data_dir().unwrap();
    home_dir.to_str().unwrap().to_string() + "/schemavision/database.sqlite"
}

pub fn get_migration_dir() -> String {
    let current_dir = env::current_dir().expect("Unable to get current directory");
    let migration_directory_name = std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("./src/db/migrations");
    current_dir
        .join(migration_directory_name)
        .to_str()
        .expect("Failed to join current directory")
        .to_owned()
}

pub fn execute_sql_files_in_directory(conn: &Connection, directory_path: String) -> Result<()> {
    // Read the list of files in the specified directory
    println!("Reading directory: {}", directory_path);
    let files = fs::read_dir(directory_path)?;

    for file in files {
        let file_path = file?.path();
        let file_path_str = file_path.to_str().unwrap_or("");

        // Check if the file is a regular file (not a directory)
        if file_path.is_file() {
            // Assuming your SQL files have a specific extension, adjust this condition as needed
            if file_path_str.ends_with(".sql") {
                // Execute the SQL file
                execute_sql_file(conn, file_path_str).expect("Failed to execute SQL file");
                println!("Executed SQL file: {}", file_path_str);
            }
        }
    }

    Ok(())
}

fn execute_sql_file(conn: &Connection, file_path: &str) -> Result<()> {
    // Read the contents of the SQL file
    let sql = fs::read_to_string(file_path)?;

    // Execute the SQL statements in the file
    conn.execute_batch(&sql)?;

    Ok(())
}
