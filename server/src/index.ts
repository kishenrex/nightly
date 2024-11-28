import express from 'express';
import cors from 'cors';
import initDB from './initDB';
import { createUserEndpoints } from './user/user-endpoints';
import { createCalendarEndpoints } from './calendar/calendar-endpoints';
import { Database } from 'sqlite';


const cookieSession = require("cookie-session");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  cookieSession({ name: "session", keys: ["nightly"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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

app.use("/auth", authRoute);

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from Express with TypeScript!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
