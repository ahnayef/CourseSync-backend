import { Request, Response } from "express";
import Joi from "joi";
import { connectToDatabase } from "../utils/db.util";


const schema = Joi.object({
    role: Joi.string().valid("Teacher", "Student", "CR").required(),
    sid: Joi.string().pattern(/^056\d{13}$/).required().messages({
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
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }
        const { role, sid, name, email, password, department, session } = value;


        if (role == "Teacher") {
            // TODO:Check if teacher exists
            // If teacher exists, return error
            // If teacher does not exist, create teacher

            const exist = await db.query("SELECT * FROM users WHERE email = ?", [email]);

            if (exist) {
                return res.status(400).send("User already exists");
            }

            

            const user = await db.query("INSERT INTO users (role, name, email, password, department) VALUES (?, ?, ?, ?, ?, ?, ?)", [role, name, email, password, department]);
            

        } else {
            //TODO: Check if exists
            // If exists, return error
            // If does not exist, create account
        }


    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}


export default Register;