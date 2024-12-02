import { Database } from 'sqlite3';
import { SleepLog } from '../types';
import db from '../db';
import { Request, Response } from 'express';


const DEFAULT_LOG = {}

export async function createSleepLog(req: Request, res: Response, db: Database) {
    const { user_id, sleep_start, sleep_duration, checklist, sleep_date } = req.body as SleepLog;

    if ( !user_id || !sleep_start || !sleep_duration || !checklist || !sleep_date ) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        await db.run('INSERT INTO sleep_logs (user_id, sleep_start, sleep_duration, checklist, sleep_date) VALUES (?, ?, ?, ?, ?, ?);', [user_id, sleep_start, sleep_duration, checklist, sleep_date]);
    } catch (error) {
        return res.status(400).send({ error: "Failed add" });
    };
    
    res.status(200).send({ "sleep_log": {user_id, sleep_start, sleep_duration, checklist, sleep_date} });
}

export async function deleteSleepLog(req: Request, res: Response, db: Database) {
    const { user_id, sleep_date } = req.body as SleepLog;

    if ( !user_id || !sleep_date ) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const exists = await db.get('SELECT user_id FROM sleep_logs WHERE user_id = ? AND sleep_date = ?', [user_id, sleep_date]);
        if (exists){
            await db.run('DELETE FROM sleep_logs WHERE user_id = ? AND sleep_date = ?', [user_id, sleep_date]);
        } else {
            return res.status(404).send({error: "Sleep log does not exist"});
        }
    } catch (error) {
        return res.status(404).send({error: "Failed delete"});
    }
    
    res.status(200).send('Successful delete');
}

export function getBedtime(req: Request, res: Response, db: Database) {

}

export async function changeBedtime(req: Request, res: Response, db: Database) {
    const { newBedtime } = req.body;

}