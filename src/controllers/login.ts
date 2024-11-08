import Joi from "joi";
import { connectToDatabase } from "../utils/db.util";
import bcrypt from 'bcrypt';


const schema = Joi.object({
    role: Joi.string().valid("Teacher", "Student", "CR").required(),
    identification: Joi.string().required(),
    password: Joi.string().required()
})

const Login = async (req: any, res: any) => {
    try {

        const db = await connectToDatabase();

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
                res.status(404).send('User not found');
            } else {
                const [user]: any = await db.query(
                    `SELECT * FROM users WHERE email = ?`,
                    [identification]
                );

                const passwordMatch = await bcrypt.compare(password, user[0].password);

                if (!passwordMatch) {
                    return res.status(401).send('Password does not match');
                }

                console.log(user[0]);
                res.status(200).send(user[0]);


            }
        } // TODO: Add the logic for the student and CR login
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

export default Login;