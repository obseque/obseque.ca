-- init.sql: created automatically by server.js if comments.db does not exist
-- This file is provided for reference.

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    comment TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    ip TEXT
);
