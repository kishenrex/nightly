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

        // Check if the `users` table exists
        const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users';");

        if (tableExists) {
            console.log("Recreating the `users` table to include the `theme` column...");

            // Rename the existing table
            await db.exec(`
                ALTER TABLE users RENAME TO users_old;
            `);

            // Create the new `users` table with the `theme` column
            await db.exec(`
                CREATE TABLE users (
                    email TEXT PRIMARY KEY,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    avatar TEXT,
                    current_streak INTEGER DEFAULT 0,
                    max_streak INTEGER DEFAULT 0
                    theme TEXT DEFAULT 'light',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Copy data from the old table to the new table, setting `theme` to its default value
            await db.exec(`
                INSERT INTO users (email, username, password, avatar, streak, created_at, updated_at)
                SELECT email, username, password, avatar, streak, created_at, updated_at
                FROM users_old;
            `);

            // Drop the old table
            await db.exec(`
                DROP TABLE users_old;
            `);

            console.log("Successfully recreated the `users` table with the `theme` column.");
        } else {
            console.log("Creating the `users` table for the first time...");

            // Create the `users` table
            await db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                    email TEXT PRIMARY KEY,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    avatar TEXT,
                    current_streak INTEGER DEFAULT 0,
                    max_streak INTEGER DEFAULT 0,
                    theme TEXT DEFAULT 'light',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
        }

        // Create the `calendar_entries` table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS calendar_entries (
                id TEXT,
                email TEXT NOT NULL,
                calendar_day TEXT NOT NULL,
                time_start TEXT,
                time_slept TEXT,
                checklist TEXT,
                bedtime TEXT,
                FOREIGN KEY (email) REFERENCES users (email) ON DELETE CASCADE
            );
        `);

        // Check existing tables for debugging
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table';");
        console.log('Existing tables:', tables); // Debug log

        // Insert test data into `users` table
        await db.run(`
            INSERT OR IGNORE INTO users (email, username, password, avatar, current_streak, max_streak, theme)
            VALUES 
                ('testuser@example.com', 'Test User', 'password123', 'default.png', 4, 8, 'dark'),
                ('exampleuser@example.com', 'Example User', 'password456', 'avatar2.png', 2, 5, 'light');
        `);

        // Insert test data into `calendar_entries` table
        await db.run(`
            INSERT OR IGNORE INTO calendar_entries (id, email, calendar_day, time_start, time_slept, checklist, bedtime)
            VALUES 
                ('1', 'testuser@example.com', '2024-11-20', '22:00', '06:00', '0|Title|Descript;1|Title2|Descript2', '21:30'),
                ('2', 'exampleuser@example.com', '2024-11-21', '23:00', '07:00', '0|Title|Descript;1|Title2|Descript2', '22:30');
        `);

        console.log('Test data added to database.'); // Debug log

        return db;
    } catch (error) {
        console.error('Database initialization error:', error); // Debug log
        throw error;
    }
};

export default initDB;
