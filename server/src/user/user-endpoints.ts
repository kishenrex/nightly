import { Database } from "sqlite";
import { createUser, getUser, updateUser, updateStreak, updateAvatar, updateTheme } from "./user-utils";
import { Request, Response } from 'express';

export function createUserEndpoints(app: any, db: any) {
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

    app.patch("/users/:email/avatar", (req: Request, res: Response) => {
        updateAvatar(req, res, db);
    });

    app.patch("/users/:email/theme", (req: Request, res: Response) => {
        updateTheme(req, res, db);
    });
}
