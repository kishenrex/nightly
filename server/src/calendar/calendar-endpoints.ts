import { createCalendarEntry, getCalendarEntries, updateCalendarEntry } from './calendar-utils';
import { Request, Response } from 'express';


export function createCalendarEndpoints(app: any, db: any) {
 app.post('/calendar/:email', (req: Request, res: Response) => {
    createCalendarEntry(req, res, db);
 });

 app.get('/calendar/:email', async (req: Request, res: Response) => {
   getCalendarEntries(req, res, db);

 });

 app.patch('/calendar/:email', (req: Request, res: Response) => {
    updateCalendarEntry(req, res, db);
 });

//  app.delete('/calendar/:email', async (req: Request, res: Response) => {
//    deleteCalendarEntry(req, res, db);
//  });
}