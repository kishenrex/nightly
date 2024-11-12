import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
    const db = await open({
        filename: "database.sqlite",
        driver: sqlite3.Database,
    });

    // Create users table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            calendar_table TEXT,
            avatar TEXT,
            streak INTEGER DEFAULT 0
        );
    `);

    // Create calendar table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS calendar_entries (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL,
            calendar_day TEXT NOT NULL,
            time_start TEXT,
            time_end TEXT,
            time_slept TEXT,
            checklist TEXT,
            desired_bedtime TEXT,
            desired_reminder_time TEXT,
            FOREIGN KEY(email) REFERENCES users(email)
        );
    `);

    return db;
};

export default initDB;