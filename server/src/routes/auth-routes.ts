import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log('Login request received for user: ', username, password);
    try {
        // check for user first
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'Invalid login' });
        }
        // check password using bcrypt methods
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid login' });
        }

        // create JWT token, verify code is using a secret key, otherwise throw error and exit
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ message: 'Missing JWT functionality, check server files' });
        }
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        console.error('There was a problem with the login request: ', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;