use std::sync::Arc;

use rspc::Router;

use crate::connections;

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
            t(|ctx, _: ()| {
                let connections = connections::Connection::get_connections().unwrap();
                connections
            })
        })
        .mutation("connections", |t| {
            t(|ctx, connection: connections::Connection| {
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
