import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
    console.log('Initializing database...'); // Debug log

    try {
        const db = await open({
            filename: "database.sqlite",
            driver: sqlite3.Database,
        });

        // Enable foreign key constraints
        await db.exec('PRAGMA foreign_keys = ON;');

        // Create users table
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
                desired_reminder_time TEXT
            );
        `);
        

        // Check existing tables for debugging
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table';");
        console.log('Existing tables:', tables); // Debug log

        // Insert test data into `users` table
        await db.run(`
            INSERT OR IGNORE INTO users (email, username, password, avatar, streak)
            VALUES 
                ('testuser@example.com', 'Test User', 'password123', 'default.png', 3),
                ('exampleuser@example.com', 'Example User', 'password456', 'avatar2.png', 5);
        `);

        // Insert test data into `calendar_entries` table
        await db.run(`
            INSERT OR IGNORE INTO calendar_entries (id, email, calendar_day, time_start, time_end, time_slept, checklist, desired_bedtime, desired_reminder_time)
            VALUES 
                ('1', 'testuser@example.com', '2024-11-20', '22:00', '06:00', '8', '{"task1": "done", "task2": "pending"}', '22:00', '21:30'),
                ('2', 'exampleuser@example.com', '2024-11-21', '23:00', '07:00', '8', '{"task1": "completed", "task2": "pending"}', '23:00', '22:30');
        `);

        console.log('Test data added to database.'); // Debug log

        return db;
    } catch (error) {
        console.error('Database initialization error:', error); // Debug log
        throw error;
    }
};

export default initDB;