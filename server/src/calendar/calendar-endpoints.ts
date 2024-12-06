import { createCalendarEntry, getCalendarEntries, updateCalendarEntry, updateCalendarEntryTime, updateCalendarBed } from './calendar-utils';
import { Request, Response } from 'express';


export function createCalendarEndpoints(app: any, db: any) {
 app.post('/calendar/:email', (req: Request, res: Response) => {
    createCalendarEntry(req, res, db);
 });

 app.get('/calendar/:email', async (req: Request, res: Response) => {
   getCalendarEntries(req, res, db);

 });

 app.patch('/calendar/:email', (req: Request, res: Response) => {
   if ("newList" in req.body) {
      updateCalendarEntry(req, res, db);
   }
   else if ("bed" in req.body) {
      updateCalendarBed(req, res, db);
   }
   else if ("slept" in req.body){
      updateCalendarEntryTime(req, res, db);
   }
 });

//  app.delete('/calendar/:email', async (req: Request, res: Response) => {
//    deleteCalendarEntry(req, res, db);
//  });
}