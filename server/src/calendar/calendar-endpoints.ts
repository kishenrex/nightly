import { Database } from "sqlite";
import { createCalendarEntry, getCalendarEntries, updateCalendarEntry } from "./calendar-utils";
import { Request, Response } from 'express';

export function createCalendarEndpoints(app: any, db: Database) {
    app.post("/calendar", (req: Request, res: Response) => {
        createCalendarEntry(req, res, db);
    });

    app.get("/calendar", (req: Request, res: Response) => {
        getCalendarEntries(req, res, db);
    });

    app.patch("/calendar/:id", (req: Request, res: Response) => {
        updateCalendarEntry(req, res, db);
    });
}