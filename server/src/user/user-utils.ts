import { User } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createUser(req: Request, res: Response, db: Database) {
    try {
        const { email, username, password, avatar } = req.body as User;

        if (!email || !username || !password) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        await db.run(
            'INSERT INTO users (email, username, password, avatar, streak) VALUES (?, ?, ?, ?, 0)',
            [email, username, password, avatar || null]
        );
        
        res.status(201).send({ email, username, avatar });
    } catch (error) {
        return res.status(400).send({ error: `User could not be created: ${error}` });
    }
}

export async function getUser(req: Request, res: Response, db: Database) {
    try {
        const { email } = req.params;
        const user = await db.get('SELECT email, username, avatar, streak FROM users WHERE email = ?', [email]);
        
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ data: user });
    } catch (error) {
        return res.status(400).send({ error: `Failed to fetch user: ${error}` });
    }
}

export async function updateStreak(req: Request, res: Response, db: Database) {
    try {
        const { email } = req.params;
        const { streak } = req.body;

        const result = await db.run('UPDATE users SET streak = ? WHERE email = ?', [streak, email]);
        
        if (result.changes === 0) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ message: "Streak updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update streak: ${error}` });
    }
}