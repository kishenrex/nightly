import { User } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

const DEFAULT_USER = {
    email: 'johnnyappleseed@nightly.com',
    username: 'JohnMachine222',
    password: 'mySecurePassword123',
    avatar: 'NightlyProfileDefault.png',
    theme: 'light', // Default theme
    currentStreak: 0,
    maxStreak: 0
};

export async function createUser(req: Request, res: Response, db: Database) {
    try {
        const { email, username, password, avatar, theme, currentStreak, maxStreak } = req.body as User;

        if (!email || !username || !password) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        await db.run(
            'INSERT INTO users (email, username, password, avatar, theme, currentStreak, maxStreak) VALUES (?, ?, ?, ?, ?, ?, 0, 0)',
            [email, username, password, avatar || null, theme || 'light']
        );
        
        res.status(201).send({ email, username, avatar, theme, currentStreak, maxStreak});
    } catch (error) {
        return res.status(400).send({ error: `User could not be created: ${error}` });
    }
}

export async function getUser(req: Request, res: Response, db: Database) {
    try {
        const { email } = req.params;
        console.log('Fetching user with email:', email);
        
        const user = await db.get(
            'SELECT email, username, avatar, theme, current_streak, max_streak FROM users WHERE email = ?',
            [email]
        );
        
        if (!user && email === DEFAULT_USER.email) {
            await db.run(
                'INSERT INTO users (email, username, password, avatar, theme, current_streak, max_streak) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [DEFAULT_USER.email, DEFAULT_USER.username, DEFAULT_USER.password,DEFAULT_USER.avatar,
                 DEFAULT_USER.theme, DEFAULT_USER.currentStreak, DEFAULT_USER.maxStreak]
            );
            
            return res.status(200).send({ 
                data: {
                    email: DEFAULT_USER.email,
                    username: DEFAULT_USER.username,
                    avatar: DEFAULT_USER.avatar,
                    theme: DEFAULT_USER.theme,
                    current_streak: DEFAULT_USER.currentStreak,
                    max_streak: DEFAULT_USER.maxStreak
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

        // Validate if email exists first
        const user = await db.get(
            'SELECT email, username, avatar, theme, current_streak, max_streak FROM users WHERE email = ?',
            [email]
        );

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // For each valid field, update it individually
        for (const [key, value] of Object.entries(updates)) {
            console.log(key, value);
            if (['username', 'password', 'avatar', 'current_streak', 'max_streak', 'theme'].includes(key)) {
                const line = await db.run(
                    `UPDATE users SET ${key} = ? WHERE email = ?`,
                    [value, email]
                );
            }
        }

        // Fetch updated user data
        const updatedUser = await db.get(
            'SELECT email, username, avatar, current_streak, max_streak, theme FROM users WHERE email = ?', 
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
        const { currentStreak, maxStreak } = req.body;

        const result = await db.run('UPDATE users SET current_streak = ?, max_streak = ? WHERE email = ?', [currentStreak, maxStreak, email]);
        
        if (result.changes === 0) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ message: "Streak updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update streak: ${error}` });
    }
}

//updates the user's avatar
export async function updateAvatar(req: Request, res: Response, db: Database) {
    try {
        const { email } = req.params;
        const { avatar } = req.body;

        const result = await db.run('UPDATE users SET avatar = ? WHERE email = ?', [avatar, email]);
        
        if (result.changes === 0) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ message: "Avatar updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update avatar: ${error}` });
    }
}

export async function updateTheme(req: Request, res: Response, db: Database) {
    try {
        const { email } = req.params;
        const { theme } = req.body;

        if (!['light', 'dark'].includes(theme)) {
            return res.status(400).send({ error: "Invalid theme value" });
        }

        const result = await db.run('UPDATE users SET theme = ? WHERE email = ?', [theme, email]);
        
        if (result.changes === 0) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ message: "Theme updated successfully" });
    } catch (error) {
        return res.status(400).send({ error: `Failed to update theme: ${error}` });
    }
}
