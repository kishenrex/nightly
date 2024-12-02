import { Database } from "sqlite";
import { createUser, getUser, updateUser, updateStreak, updateTheme } from "./user-utils";
import { Request, Response } from 'express';

export function createUserEndpoints(app: any, db: Database) {
    app.post("/users", (req: Request, res: Response) => {
        createUser(req, res, db);
    });

    app.get("/users/:email", (req: Request, res: Response) => {
        getUser(req, res, db);
    });

    app.patch("/users/:email", (req: Request, res: Response) => {
        updateUser(req, res, db);
    });

    app.patch("/users/:email/streak", (req: Request, res: Response) => {
        updateStreak(req, res, db);
    });

    app.patch("/users/:email/theme", (req: Request, res: Response) => {
        updateTheme(req, res, db);
    });
}
