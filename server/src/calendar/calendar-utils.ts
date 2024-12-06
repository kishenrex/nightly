import { CalendarEntry } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createCalendarEntry(req: Request, res: Response, db: Database) {
    try {
        const entry = req.body as CalendarEntry;
        
        if (!entry.calendar_day) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        await db.run(`
            INSERT INTO calendar_entries (
                id, email, calendar_day, time_start,
                time_slept, checklist, bedtime
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [entry.id, entry.email, entry.calendar_day, entry.time_start, 
             entry.time_slept, entry.checklist, entry.bedtime]
        );

        res.status(201).send({ calendar: entry });
    } catch (error) {
        return res.status(400).send({ error: `Calendar entry could not be created: ${error}` });
    }
}

export async function updateCalendarEntry(req: Request, res: Response, db: Database) {
    try {
        const { date, newList }= req.body;

        await db.run(
            `UPDATE calendar_entries SET checklist = ? WHERE calendar_day = ?`,
            [newList, date]
        );

        return res.status(200).send({ message: "Calendar entry updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update calendar entry: ${error}` });
    }
}

export async function updateCalendarBed(req: Request, res: Response, db: Database) {
    try {
        const { date, bed }= req.body;

        await db.run(
            `UPDATE calendar_entries SET bedtime = ? WHERE calendar_day = ?`,
            [bed, date]
        );

        return res.status(200).send({ message: "Calendar entry updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update calendar entry: ${error}` });
    }
}

export async function updateCalendarEntryTime(req: Request, res: Response, db: Database) {
    try {
        const { date, start , slept } = req.body;

        await db.run(
            `UPDATE calendar_entries SET time_start = ?, time_slept = ? WHERE calendar_day = ?`,
            [start, slept, date]
        );

        return res.status(200).send({ message: "Calendar entry updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update calendar entry time: ${error}` });
    }
}

export async function getCalendarEntries(req: Request, res: Response, db: Database) {
    try {
        const email = req.params.email as string;

        const rows = await db.all(`SELECT * FROM calendar_entries WHERE email = ?`,
            [email]
        );

        // console.log('Fetched rows:', rows); // Log fetched rows for debugging
        // console.log('Current email:', email); // Log fetched rows for debugging
        res.status(200).send({ calendar: rows });

      } catch (err) {
        console.error('Database fetch error:', err); // Log any database errors
        res.status(500).send({ error: 'Database fetch error' });
      }
}

// Currently unused
export async function deleteCalendarEntry(req: Request, res: Response, db: Database) {
    try {
        const date = req.body as string;
        
        if (!date) {
            return res.status(400).send({ error: "Missing date" });
        }

        await db.run(`
            DELETE FROM calender_entries WHERE calendar_day = ?`,
            [date]
        );
    } catch (error) {
        return res.status(400).send({ error: `Calendar entry could not be created` });
    }
}

// Currently unused
// export async function getCalendarEntries(req: Request, res: Response, db: Database) {
//     try {
//         const { email, startDate, endDate } = req.query;
        
//         let query = 'SELECT * FROM calendar_entries WHERE email = ?';
//         const params: any[] = [email];

//         if (startDate && endDate) {
//             query += ' AND calendar_day BETWEEN ? AND ?';
//             params.push(startDate as string, endDate as string);
//         }

//         const entries = await db.all(query, params);
//         return res.status(200).send({ data: entries });
//     } catch (error) {
//         return res.status(400).send({ error: `Failed to fetch calendar entries: ${error}` });
//     }
// }

