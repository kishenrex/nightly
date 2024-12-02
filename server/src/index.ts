import express from 'express';
import db from './db';  
import { createSleepLogEndpoints } from './bedtime/sleep-log-endpoints';

const app = express();
const port = 3001;

app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from Express with TypeScript!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

createSleepLogEndpoints(app, db);
