use crate::db;
use rusqlite::params;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Debug, Type, Serialize, Deserialize, Clone, Copy)]
pub enum DBMS {
    MySQL,
    PostgreSQL,
    SQLite,
    SQLServer,
    MariaDB,
}

impl DBMS {
    fn to_string(&self) -> String {
        match self {
            DBMS::MySQL => "MySQL".to_string(),
            DBMS::PostgreSQL => "PostgreSQL".to_string(),
            DBMS::SQLite => "SQLite".to_string(),
            DBMS::SQLServer => "SQLServer".to_string(),
            DBMS::MariaDB => "MariaDB".to_string(),
        }
    }

    fn into_enum(s: String) -> DBMS {
        match s.as_str() {
            "MySQL" => DBMS::MySQL,
            "PostgreSQL" => DBMS::PostgreSQL,
            "SQLite" => DBMS::SQLite,
            "SQLServer" => DBMS::SQLServer,
            "MariaDB" => DBMS::MariaDB,
            _ => panic!("Invalid DBMS"),
        }
    }
}

#[derive(Debug, Type, Serialize, Deserialize)]
pub struct Connection {
    pub id: Option<i32>,
    pub dbms: DBMS,
    pub name: String,
    pub host: String,
    pub port: i32,
    pub user: String,
    pub password: String,
    pub default_database: String,
    pub default_schema: String,
    pub ssl: bool,
    pub ssl_ca: String,
    pub ssl_cert: String,
    pub ssl_key: String,
    pub ssl_pass: String,
    pub ssl_mode: String,
}

impl Connection {
    pub fn new(
        dbms: DBMS,
        name: String,
        host: String,
        port: i32,
        user: String,
        password: String,
        default_database: String,
        default_schema: String,
        ssl: bool,
        ssl_ca: String,
        ssl_cert: String,
        ssl_key: String,
        ssl_pass: String,
        ssl_mode: String,
    ) -> Connection {
        Connection {
            id: None,
            dbms,
            name,
            host,
            port,
            user,
            password,
            default_database,
            default_schema,
            ssl,
            ssl_ca,
            ssl_cert,
            ssl_key,
            ssl_pass,
            ssl_mode,
        }
    }

    pub fn get_connections() -> Result<Vec<Connection>, String> {
        let conn = db::establish_db_connection();
        let mut stmt = conn.prepare("SELECT * FROM connections").unwrap();
        let connections = stmt.query_map(params![], |row| {
            Ok(Connection::new(
                DBMS::into_enum(row.get(1)?),
                row.get(2)?,
                row.get(3)?,
                row.get(4)?,
                row.get(5)?,
                row.get(6)?,
                row.get(7)?,
                row.get(8)?,
                row.get(9)?,
                row.get(10)?,
                row.get(11)?,
                row.get(12)?,
                row.get(13)?,
                row.get(14)?,
            ))
        });

        match connections {
            Ok(connection) => Ok(connection.collect::<Result<Vec<_>, _>>().unwrap()),
            Err(e) => Err(String::from("Error getting connections from database")),
        }
    }

    pub fn insert_into_database(&self) -> rusqlite::Result<()> {
        let conn = db::establish_db_connection();
        conn.execute(
            "INSERT INTO connections (dbms, name, host, port, user, password, default_database, default_schema, ssl, ssl_ca, ssl_cert, ssl_key, ssl_pass, ssl_mode) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)",
            params![self.dbms.to_string(), self.name, self.host, self.port, self.user, self.password, self.default_database, self.default_schema, self.ssl, self.ssl_ca, self.ssl_cert, self.ssl_key, self.ssl_pass, self.ssl_mode],
        )?;
        Ok(())
    }
}
