import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const schema = Joi.object({
    role: Joi.string().valid("Teacher", "Student", "CR").required(),
    identification: Joi.string().required(),
    password: Joi.string().required()
})



const Login = async (req: any, res: any) => {
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

        const { role, identification, password } = value;


        if (role == 'Teacher') {
            const [rows]: any = await db.query(
                `SELECT email FROM users WHERE email = ?`,
                [identification]
            );

            if (rows.length == 0) {
                return res.status(404).send('User not found');
            } else {
                const [user]: any = await db.query(
                    `SELECT * FROM users WHERE email = ?`,
                    [identification]
                );

                const passwordMatch = await bcrypt.compare(password, user[0].password);

                if (!passwordMatch) {
                    return res.status(401).send('Wrong password');
                }

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
            }
        } else {
            const [rows]: any = await db.query(
                `SELECT sid FROM users WHERE sid = ?`,
                [identification]
            );

            if (rows.length == 0) {
                return res.status(404).send('User not found');
            } else {
                const [user]: any = await db.query(
                    `SELECT * FROM users WHERE sid = ?`,
                    [identification]
                );

                const passwordMatch = await bcrypt.compare(password, user[0].password);

                if (!passwordMatch) {
                    return res.status(401).send('Password does not match');
                }

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
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

export default Login;