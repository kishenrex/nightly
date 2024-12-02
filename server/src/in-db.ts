import db from './db';

//initializing our databse

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS sleep_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            sleep_start INTEGER,
            sleep_duration INTEGER,
            checklist TEXT,
            sleep_date DATE,
            FOREIGN KEY (user_id) REFERENCES users(id),
            UNIQUE(user_id, sleep_date) -- This ensures no duplicate user_id and sleep_date combination
        );
    `, (err) => {
        if (err) {
            console.error('Error creating sleep_logs table:', err);
        } else {
            console.log('Sleep_logs table created or already exists');
        }
    });

    db.run(`INSERT INTO sleep_logs (user_id, sleep_start, sleep_duration, checklist, \sleep_date) VALUES (1, 10, 7, '', 9, '2024-11-10');`, function(err) {
        if (err) {
            console.error('Error inserting data into sleep_logs:', err);
        } else {
            console.log('Inserted data into sleep_logs:', this.lastID);
        }
    });
});

db.close();
