import Joi from "joi";
import bcrypt from 'bcrypt';
import { connectToDatabase } from "../../utils/db.util";

const schema = Joi.object({
    id: Joi.any().required(),
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
    confirmPassword: Joi.ref('password'),
    department: Joi.string().valid("CSE", "BBA", "English", "LLB").required(),
});

const updateHOD = async (req: any, res: any) => {

    try {
        const { user } = req;

        if (user.role !== 'admin') {
            return res.status(403).send('You are not authorized to perform this action');
        }

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const { id, name, email, password, department } = value;

        const db = await connectToDatabase();

        const [rows]: any = await db.query("SELECT email FROM users WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).send("User not found");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result]: any = await db.query(
            "UPDATE users SET name = ?, email = ?, password = ?, department = ? WHERE id = ?",
            [name, email, hashedPassword, department, id]
        );

        if (!result.affectedRows) {
            return res.status(500).send("Failed to update HOD");
        }

        return res.status(200).send("HOD updated successfully");


    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }

}

export default updateHOD;