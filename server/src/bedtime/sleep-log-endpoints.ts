import { Database } from 'sqlite3';
import { createSleepLog, deleteSleepLog } from './sleep-log-utils';
import { Request, Response } from 'express';

export function createSleepLogEndpoints(app: any, db: Database) {

    //get the information for sleep-logs inputted
    app.get('/sleep-logs', (req: Request, res: Response) => {
        db.all('SELECT * FROM sleep_logs', [], (err, rows) => {
            if (err) {
                res.status(500).send({ error: 'Database error' });
                return;
            }
            res.json(rows);
        });
    });

    app.post("/sleep-log", (req: Request, res: Response) => {
        createSleepLog(req, res, db);
    });

    app.delete("/sleep-log", (req: Request, res: Response) => {
        deleteSleepLog(req, res, db);
    });

    app.put("/sleep-log", (req: Request, res: Response) => {

    });
}