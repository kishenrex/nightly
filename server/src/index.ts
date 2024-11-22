import express from 'express';
import cors from 'cors';
import initDB from './initDB';
import { createUserEndpoints } from './user/user-endpoints';
import { createCalendarEndpoints } from './Calendar/calendar-endpoints';
import { Database } from 'sqlite';

const app = express();
const port = process.env.PORT || 3001;
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
// Middleware
app.use(cors());
app.use(express.json());

// Database and Server initialization
async function startServer() {
    try {
        // Initialize database
        const db: Database = await initDB();
        console.log('Database initialized successfully');

        // Create endpoints
        createUserEndpoints(app, db);
        createCalendarEndpoints(app, db);
        console.log('Endpoints created successfully');

        // Basic health check endpoint
        app.get('/health', (req, res) => {
            res.status(200).send({ status: 'OK' });
        });

        // Error handling middleware
        app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(err.stack);
            res.status(500).send({ error: 'Something went wrong!' });
        });
// Database and Server initialization
async function startServer() {
    try {
        // Initialize database
        const db: Database = await initDB();
        console.log('Database initialized successfully');

        // Create endpoints
        createCalendarEndpoints(app, db);
        console.log('Endpoints created successfully');

        // Basic health check endpoint
        app.get('/health', (req, res) => {
            res.status(200).send({ status: 'OK' });
        });

        // Error handling middleware
        app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error(err.stack);
            res.status(500).send({ error: 'Something went wrong!' });
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer().catch(console.error);

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer().catch(console.error);

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

export default app;