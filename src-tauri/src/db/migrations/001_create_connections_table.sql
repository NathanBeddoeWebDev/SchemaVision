-- 001_create_connections_table.sql

-- Create the connections table
CREATE TABLE IF NOT EXISTS connections
(
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    dbms              TEXT    NOT NULL,
    name              TEXT    NOT NULL,
    host              TEXT    NOT NULL,
    port              INTEGER NOT NULL,
    user              TEXT    NOT NULL,
    password          TEXT    NOT NULL,
    default_database  TEXT,
    default_schema    TEXT,
    connection_string TEXT,
    ssl               INTEGER NOT NULL DEFAULT 0,
    ssl_ca            TEXT,
    ssl_cert          TEXT,
    ssl_key           TEXT,
    ssl_pass          TEXT,
    ssl_mode          TEXT
);