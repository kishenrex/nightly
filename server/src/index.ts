import express from 'express';
import db from './db';  

const app = express();
const port = 3001;

app.use(express.json());

//get the information for sleep-logs inputted
app.get('/sleep-logs', (req, res) => {
    db.all('SELECT * FROM sleep_logs', [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
            return;
        }
        res.json(rows);
    });
});

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from Express with TypeScript!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
