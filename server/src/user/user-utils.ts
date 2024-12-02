import { User } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

const DEFAULT_USER = {
    email: 'johnnyappleseed@nightly.com',
    username: 'JohnMachine222',
    password: 'mySecurePassword123',
    streak: 0
};

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
        console.log('Fetching user with email:', email);
        
        const user = await db.get(
            'SELECT email, username, avatar, streak FROM users WHERE email = ?', 
            [email]
        );
        
        if (!user && email === DEFAULT_USER.email) {
            // If the default user doesn't exist, create it
            await db.run(
                'INSERT INTO users (email, username, password, streak) VALUES (?, ?, ?, ?)',
                [DEFAULT_USER.email, DEFAULT_USER.username, DEFAULT_USER.password, DEFAULT_USER.streak]
            );
            
            return res.status(200).send({ 
                data: {
                    email: DEFAULT_USER.email,
                    username: DEFAULT_USER.username,
                    avatar: null,
                    streak: DEFAULT_USER.streak
                }
            });
        }
        
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ data: user });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(400).send({ error: `Failed to fetch user: ${error}` });
    }
}

export async function updateUser(req: Request, res: Response, db: Database) {
    try {
        const { email } = req.params;
        const updates = req.body;
        
        console.log('Updating user:', email, 'with:', updates); // Debug log

        // Validate if email exists first
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!existingUser) {
            return res.status(404).send({ error: "User not found" });
        }

        // For each valid field, update it individually
        for (const [key, value] of Object.entries(updates)) {
            if (['username', 'password', 'avatar'].includes(key)) {
                await db.run(
                    `UPDATE users SET ${key} = ? WHERE email = ?`,
                    [value, email]
                );
            }
        }

        // Fetch updated user data
        const updatedUser = await db.get(
            'SELECT email, username, avatar, streak FROM users WHERE email = ?', 
            [email]
        );

        return res.status(200).send({ 
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error('Update error:', error); // Debug log
        return res.status(400).send({ error: `Failed to update user: ${error}` });
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