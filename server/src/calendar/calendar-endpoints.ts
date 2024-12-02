import { createCalendarEntry, getCalendarEntries, updateCalendarEntry } from './calendar-utils';
import { Request, Response } from 'express';


export function createCalendarEndpoints(app: any, db: any) {
 app.post('/calendar/:email', (req: Request, res: Response) => {
    createCalendarEntry(req, res, db);
 });


 app.get('/calendar/:email', async (req: Request, res: Response) => {
    updateCalendarEntry(req, res, db);
  //  try {
  //    const rows = await db.all('SELECT * FROM calendar_entries');
  //    console.log('Fetched rows:', rows); // Log fetched rows for debugging
  //    res.status(200).send({ data: rows });
  //  } catch (err) {
  //    console.error('Database fetch error:', err); // Log any database errors
  //    res.status(500).send({ error: 'Database fetch error' });
  //  }
 });


 app.patch('/calendar/:email', (req: Request, res: Response) => {
    updateCalendarEntry(req, res, db);
 });
}