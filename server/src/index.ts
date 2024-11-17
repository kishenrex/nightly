import express from 'express';
import cors from 'cors';
import db from './db';  

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enables CORS for frontend-backend communication
app.use(express.json()); // Parses incoming JSON requests

// Route to get sleep logs
app.get('/sleep-logs', (req, res) => {
  db.all('SELECT * FROM sleep_logs', [], (err, rows) => {
      if (err) {
          res.status(500).send({ error: 'Database error' });
          return;
      }
      res.json(rows);
  });
});

// Route to insert timer data into the database
app.post('/sleep-logs', (req, res) => {
  const { user_id, sleep_duration, sleep_date } = req.body; // Destructure incoming data

  if (!user_id || !sleep_duration || !sleep_date) {
      res.status(400).send({ error: 'Missing required fields' });
      return;
  }

  db.run(
      `INSERT INTO sleep_logs (user_id, sleep_duration, sleep_date) VALUES (?, ?, ?)`,
      [user_id, sleep_duration, sleep_date],
      function (err) {
          if (err) {
              res.status(500).send({ error: 'Failed to insert sleep log' });
          } else {
              res.status(201).send({ id: this.lastID }); // Return the ID of the inserted row
          }
      }
  );
});

// Basic test route
app.get('/', (req, res) => {
    res.send('Hello from Express with TypeScript!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
