import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: any, next: NextFunction) => {

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        return res.status(500).send('JWT secret key is not defined');
    }

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        // TODO: Complete the implementation 
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }

}   