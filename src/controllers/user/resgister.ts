import { Request, Response } from "express";
import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();


const schema = Joi.object({
    role: Joi.string().valid("Teacher", "Student", "CR").required(),
    sid: Joi.string().allow(null).pattern(/^056\d{13}$/).required().messages({
        'string.pattern.base': 'ID must be 16 digits starting with 056',
    }),
    name: Joi.string().min(5).required(),
    email: Joi.string().allow(null).optional()
        .pattern(/^[a-zA-Z0-9._%+-]+@neub\.edu\.bd$/)
        .messages({
            'string.pattern.base': 'Email must be a valid neub.edu.bd address',
        }),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be 8+ charecter with upper, lower, number, and special charecter',
        }),
    department: Joi.string().valid("CSE", "EEE", "BBA", "ENG").required(),
    session: Joi.string().allow(null).optional()
})

const Register = async (req: Request, res: any) => {
    try {
        const db = await connectToDatabase();

        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) {
            return res.status(500).send('JWT secret key is not defined. Check environment variables');
        }

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }
        const { role, sid, name, email, password, department, session } = value;

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role == "Teacher") {
            const [rows]: any = await db.query("SELECT email FROM users WHERE email = ?", [email]);

            if (rows.length > 0) {
                return res.status(400).send("User already exists");
            }

            const result: any = await db.query(
                "INSERT INTO users (role, name, email, password, department) VALUES (?, ?, ?, ?, ?)",
                [role, name, email, hashedPassword, department]
            );

            const [user]: any = await db.query("SELECT * FROM users WHERE id = ?", [result[0].insertId]);
            const token = jwt.sign(
                { id: user[0].id, role: user[0].role, email: user[0].email },
                secretKey,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                data: {
                    token, user: {
                        name: user[0].name,
                        email: user[0].email,
                        role: user[0].role,
                        department: user[0].department
                    }
                }
            });

        } else {
            const [rows]: any = await db.query("SELECT sid FROM users WHERE sid = ?", [sid]);

            if (rows.length > 0) {
                return res.status(400).send("User already exists");
            }

            const result: any = await db.query(
                "INSERT INTO users (role, sid, name, password, department, session) VALUES (?, ?, ?, ?, ?, ?)",
                [role, sid, name, hashedPassword, department, session]
            );

            const [user]: any = await db.query("SELECT * FROM users WHERE id = ?", [result[0].insertId]);

            const token = jwt.sign(
                { id: user[0].id, role: user[0].role, sid: user[0].sid },
                secretKey,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                data: {
                    token, user: {
                        name: user[0].name,
                        sid: user[0].sid,
                        role: user[0].role,
                        department: user[0].department,
                        session: user[0].session
                    }
                }
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};


export default Register;