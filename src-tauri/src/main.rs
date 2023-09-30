// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod connections;
mod db;
mod router;

use std::sync::Arc;

use router::{router, MyCtx};
use specta::collect_types;
use tauri_specta::ts;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
#[specta::specta]
fn create_connection(connection: connections::Connection) -> () {
    match connection.insert_into_database() {
        Ok(_) => println!("Connection inserted into database"),
        Err(e) => println!("Error inserting connection into database: {}", e),
    }
}

#[tauri::command]
#[specta::specta]
fn get_connections() -> Result<Vec<connections::Connection>, String> {
    match connections::Connection::get_connections() {
        Ok(connections) => Ok(connections),
        Err(e) => Err(e),
    }
}

#[tokio::main]
async fn main() {
    let router = router();
    db::init();

    let conn = db::establish_db_connection();
    db::execute_sql_files_in_directory(&conn, db::get_migration_dir()).unwrap();
    // #[cfg(debug_assertions)]
    // ts::export(
    //     collect_types![create_connection, get_connections],
    //     "../src/bindings.ts",
    // )
    // .unwrap();

    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin_with_ctx(
            router.arced(),
            |window| MyCtx {
                db: Arc::new(db::establish_db_connection()),
            },
        ))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
