import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
