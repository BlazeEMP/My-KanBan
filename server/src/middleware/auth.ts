import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    // extract token from Authorization header value separate from 'Bearer' in header value for Authorization
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // use JWT verify method to verify the token and decode its user data
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        // add user data to the request as JWT payload
        req.user = user as JwtPayload;
        return next();
    });
    return; // this allows us to use the return value on line 12 to verify authHeader will exist, using the filter first method to check if we dont want to run any code, THEN handling code we want to execute 
};