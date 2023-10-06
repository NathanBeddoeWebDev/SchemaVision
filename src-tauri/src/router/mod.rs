use std::sync::Arc;

use rspc::Router;

use crate::connections::Connection;

pub struct MyCtx {
    pub db: Arc<rusqlite::Connection>,
}

unsafe impl Send for MyCtx {}

unsafe impl Sync for MyCtx {}

pub fn router() -> Router<MyCtx> {
    let router = Router::<MyCtx>::new();
    let config = rspc::Config::new().set_ts_bindings_header("/* eslint-disable */");

    #[cfg(all(debug_assertions, not(feature = "mobile")))]
        let config = config.export_ts_bindings(
        std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../src/bindings.ts"),
    );

    let router = router
        .query("connections", |t| {
            t(|ctx, input: Option<i32>| async move {
                return if let Some(input) = input {
                    vec![Connection::get_connection(input).unwrap()]
                } else {
                    Connection::get_connections().unwrap()
                };
            })
        })
        .query("connections/tables", |t| {
            t(|ctx, input: Connection| async move {
                return input.get_tables();
            })
        })
        .mutation("connections", |t| {
            t(|_ctx, connection: Connection| {
                println!("connection: {:?}", connection);
                match connection.insert_into_database() {
                    Ok(_) => println!("Connection inserted into database"),
                    Err(e) => println!("Error inserting connection into database: {}", e),
                }
            })
        })
        .config(config);

    router.build()
}
