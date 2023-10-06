use rusqlite::{Error, params, Row};
use serde::{Deserialize, Serialize};
use specta::Type;

use crate::db;

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

    pub fn get_table_names(&self, db: rusqlite::Connection) -> Vec<Row> {
        // get list of rows
        return match self {}.expect("TODO: panic message");
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
    pub connection_string: Option<String>,
    pub ssl: bool,
    pub ssl_ca: String,
    pub ssl_cert: String,
    pub ssl_key: String,
    pub ssl_pass: String,
    pub ssl_mode: String,
}

impl Connection {
    pub fn new(
        id: Option<i32>,
        dbms: DBMS,
        name: String,
        host: String,
        port: i32,
        user: String,
        password: String,
        default_database: String,
        default_schema: String,
        connection_string: Option<String>,
        ssl: bool,
        ssl_ca: String,
        ssl_cert: String,
        ssl_key: String,
        ssl_pass: String,
        ssl_mode: String,
    ) -> Connection {
        Connection {
            id,
            dbms,
            name,
            host,
            port,
            user,
            password,
            default_database,
            default_schema,
            connection_string,
            ssl,
            ssl_ca,
            ssl_cert,
            ssl_key,
            ssl_pass,
            ssl_mode,
        }
    }

    pub fn get_connection(id: i32) -> Result<Connection, String> {
        let conn = db::establish_db_connection();
        let mut stmt = conn
            .prepare("SELECT * FROM connections WHERE id = ?1;")
            .unwrap();
        let connections = stmt.query_row(params![id], |row| Connection::from_row(row));

        match connections {
            Ok(connection) => Ok(connection),
            Err(e) => Err(String::from("Error getting connection from database")),
        }
    }

    fn from_row(row: &Row) -> Result<Connection, Error> {
        Ok(Connection::new(
            row.get(0)?,
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
            row.get(15)?,
        ))
    }

    pub fn get_connections() -> Result<Vec<Connection>, String> {
        let conn = db::establish_db_connection();
        let mut stmt = conn.prepare("SELECT * FROM connections").unwrap();
        let connections = stmt.query_map(params![], |row| Connection::from_row(row));

        match connections {
            Ok(connection) => Ok(connection.collect::<Result<Vec<_>, _>>().unwrap()),
            Err(e) => Err(String::from("Error getting connections from database")),
        }
    }

    pub fn insert_into_database(&self) -> rusqlite::Result<()> {
        let conn = db::establish_db_connection();
        conn.execute(
            "INSERT INTO connections (dbms, name, host, port, user, password, default_database, default_schema, connection_string, ssl, ssl_ca, ssl_cert, ssl_key, ssl_pass, ssl_mode) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15)",
            params![self.dbms.to_string(), self.name, self.host, self.port, self.user, self.password, self.default_database, self.default_schema, self.connection_string, self.ssl, self.ssl_ca, self.ssl_cert, self.ssl_key, self.ssl_pass, self.ssl_mode],
        ).expect("Error inserting connection into database");
        Ok(())
    }

    pub fn get_tables(&self) -> Vec<Row> {
        let conn = db::establish_db_connection();
        self.dbms.get_table_names(conn)
    }
}
