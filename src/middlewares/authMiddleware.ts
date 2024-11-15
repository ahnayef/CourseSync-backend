import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: NextFunction) => {

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        return res.status(500).send('JWT secret key is not defined. Check environment variables');
    }

    const token = req.header('Authorization');
    const parsedToken = token?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }

    try {
        const user = jwt.verify(parsedToken, secretKey);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Your token is expired or invalid, please login again');
    }

}

export default authMiddleware;