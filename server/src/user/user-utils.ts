import { User } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

const DEFAULT_USER = {
    email: 'johnnyappleseed@nightly.com',
    username: 'JohnMachine222',
    password: 'mySecurePassword123',
    avatar: 'pokemon_starters.jpeg',
    streak: 0,
    theme: 'light', // Default theme
    currentStreak: 0,
    maxStreak: 0
};

export async function createUser(req: Request, res: Response, db: Database) {
    try {
        const { email, username, password, avatar, theme } = req.body as User;

        if (!email || !username || !password) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        await db.run(
            'INSERT INTO users (email, username, password, avatar, streak, theme) VALUES (?, ?, ?, ?, 0, ?)',
            [email, username, password, avatar || null, theme || 'light']
        );
        
        res.status(201).send({ email, username, avatar, theme });
    } catch (error) {
        return res.status(400).send({ error: `User could not be created: ${error}` });
    }
}

export async function getUser(req: Request, res: Response, db: Database) {
    try {
        const { email } = req.params;
        console.log('Fetching user with email:', email);
        
        const user = await db.get(
            'SELECT email, username, avatar, current_streak, max_streak FROM users WHERE email = ?',
            [email]
        );
        
        if (!user && email === DEFAULT_USER.email) {
            await db.run(
                'INSERT INTO users (email, username, password, avatar, streak, theme, current_streak, max_streak) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [DEFAULT_USER.email, DEFAULT_USER.username, DEFAULT_USER.password,DEFAULT_USER.avatar,
                     DEFAULT_USER.streak, DEFAULT_USER.theme, DEFAULT_USER.currentStreak, DEFAULT_USER.maxStreak]

            );
            
            return res.status(200).send({ 
                data: {
                    email: DEFAULT_USER.email,
                    username: DEFAULT_USER.username,
                    avatar: DEFAULT_USER.avatar,
                    streak: DEFAULT_USER.streak,
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
        
        console.log('Updating user:', email, 'with:', updates); // Debug log

        // Validate if email exists first
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!existingUser) {
            return res.status(404).send({ error: "User not found" });
        }

        // For each valid field, update it individually
        for (const [key, value] of Object.entries(updates)) {
            if (['username', 'password', 'avatar', 'theme'].includes(key)) {
                await db.run(
                    `UPDATE users SET ${key} = ? WHERE email = ?`,
                    [value, email]
                );
            }
        }

        // Fetch updated user data
        const updatedUser = await db.get(
            'SELECT email, username, avatar, streak, theme FROM users WHERE email = ?', 
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
