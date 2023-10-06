use std::{collections::HashMap, ops::Deref};

use anyhow::Result;
use async_trait::async_trait;
use serde_json::Value as JsonValue;
use sqlx::{Pool, Sqlite};
use sv_core::{DBMS, RDBMS, DbInstances};
use tokio::sync::Mutex;

pub struct SqliteDB {}

#[async_trait]
impl DBMS<Sqlite> for SqliteDB {
    /**
        connect loads a database and stores it in a db_instances hashmap :)
        
    */
    async fn connect(
        &self,
        connection_string: &String,
        migration_directory_path: std::path::PathBuf,
        db_instances: &DbInstances,
    ) -> Result<String> {
        if db_instances.0.lock().await.contains_key(connection_string) {
            return Ok(String::new());
        }
        
        let pool = Pool::connect(connection_string).await.expect("Failed to connect to database");
        db_instances.0.lock().await.insert(connection_string.clone(), pool);
        return Ok(String::new());
    }
}

impl RDBMS<sqlx::sqlite::Sqlite, i64> for SqliteDB {
    fn to_string(&self) -> String {
        return "SQLite".to_string();
    }
    fn to_enum(s: String) -> Self {
        return SqliteDB {};
    }

    fn get_table_names(&self, db: sqlx::sqlite::Sqlite) -> Vec<String> {
        return vec![];
    }

    fn query(
        &self,
        db: sqlx::sqlite::Sqlite,
        query: String,
    ) -> Result<Vec<HashMap<String, JsonValue>>> {
        return Ok(vec![]);
    }
    fn mutate(&self, db: sqlx::sqlite::Sqlite, query: String) -> Result<(u64, i64)> {
        return Ok((0, 0));
    }
}

impl SqliteDB {
    fn new() -> Self {
        return SqliteDB {};
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;
    use std::sync::Arc;
    use tokio::sync::Mutex;
    use sv_core::{DBMS, DbInstances};

    #[tokio::test]
    async fn test_connect() {
        sqlx::any::install(&[sqlite::Sqlite::default()]).await;
        let connection_string = String::from("sqlite::memory:");
        let migration_directory_path = std::path::PathBuf::from("/path/to/migrations");
        let db_instances = DbInstances(Mutex::new(HashMap::new()));
        let sqlite_db = SqliteDB::new();

        // Test connecting to a new database
        let result = sqlite_db.connect(&connection_string, migration_directory_path.clone(), &db_instances).await;
        assert!(result.is_ok());
        assert_eq!(db_instances.0.lock().await.len(), 1);

        // Test connecting to the same database again
        let result = sqlite_db.connect(&connection_string, migration_directory_path.clone(), &db_instances).await;
        assert!(result.is_ok());
        assert_eq!(db_instances.0.lock().await.len(), 1);
    }
}
