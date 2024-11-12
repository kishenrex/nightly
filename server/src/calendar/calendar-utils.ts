import { CalendarEntry } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createCalendarEntry(req: Request, res: Response, db: Database) {
    try {
        const entry = req.body as CalendarEntry;
        
        if (!entry.email || !entry.calendar_day) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        await db.run(`
            INSERT INTO calendar_entries (
                id, email, calendar_day, time_start, time_end, 
                time_slept, checklist, desired_bedtime, desired_reminder_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [entry.id, entry.email, entry.calendar_day, entry.time_start, 
             entry.time_end, entry.time_slept, entry.checklist, 
             entry.desired_bedtime, entry.desired_reminder_time]
        );

        res.status(201).send({ data: entry });
    } catch (error) {
        return res.status(400).send({ error: `Calendar entry could not be created: ${error}` });
    }
}

export async function getCalendarEntries(req: Request, res: Response, db: Database) {
    try {
        const { email, startDate, endDate } = req.query;
        
        let query = 'SELECT * FROM calendar_entries WHERE email = ?';
        const params: any[] = [email];

        if (startDate && endDate) {
            query += ' AND calendar_day BETWEEN ? AND ?';
            params.push(startDate as string, endDate as string);
        }

        const entries = await db.all(query, params);
        return res.status(200).send({ data: entries });
    } catch (error) {
        return res.status(400).send({ error: `Failed to fetch calendar entries: ${error}` });
    }
}

export async function updateCalendarEntry(req: Request, res: Response, db: Database) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const entry = await db.get('SELECT * FROM calendar_entries WHERE id = ?', [id]);
        
        if (!entry) {
            return res.status(404).send({ error: "Calendar entry not found" });
        }

        const fields = Object.keys(updates)
            .filter(key => key !== 'id' && key !== 'email')
            .map(key => `${key} = ?`)
            .join(', ');

        const values = Object.entries(updates)
            .filter(([key]) => key !== 'id' && key !== 'email')
            .map(([_, value]) => value);

        await db.run(
            `UPDATE calendar_entries SET ${fields} WHERE id = ?`,
            [...values, id]
        );

        return res.status(200).send({ message: "Calendar entry updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update calendar entry: ${error}` });
    }
}
