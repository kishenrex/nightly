// initDB.ts
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
    console.log('Initializing database...'); // Debug log
    
    try {
        const db = await open({
            filename: "database.sqlite",
            driver: sqlite3.Database,
        });

        // Enable foreign keys
        await db.exec('PRAGMA foreign_keys = ON;');

        // Create users table with proper constraints
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                email TEXT PRIMARY KEY,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                avatar TEXT,
                streak INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Add any existing tables check
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table';");
        console.log('Existing tables:', tables); // Debug log

        return db;
    } catch (error) {
        console.error('Database initialization error:', error); // Debug log
        throw error;
    }
};

export default initDB;