import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";


const schema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().regex(/^[A-Z]{3}-\d{3,8}$/).required().messages({
        'string.pattern.base': 'Course Code must be in format of AAA-12345678',
    }),
    credit: Joi.string().valid("3","1.5").required(),
    department: Joi.string().valid("CSE", "BBA", "English", "LLB").required(),
    session: Joi.string().allow(null).pattern(/^(Spring|Summer|Fall) \d{2}$/).optional().messages({
        'string.pattern.base': 'Session must be in format of (Spring|Summer|Fall) YY',
    }),
})

const createCourse = async (req: any, res: any) => {
    try {

        const { id, role } = req.user;

        if (role !== "teacher") {
            return res.status(403).send("You are not authorized to create a course");
        }

        const db = await connectToDatabase();

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const { name, code, credit, department, session } = value;

        const [rows]: any = await db.query("SELECT * FROM courses WHERE code = ? AND session = ?", [code, session]);

        if (rows.length) {
            return res.status(409).send("Course already exists");
        }

        const result: any = await db.query(
            "INSERT INTO courses (name, code, credit, department, session,instructor) VALUES (?, ?, ?, ?, ?, ?)",
            [name, code, credit, department, session, id]
        )

        const [course]: any = await db.query("SELECT * FROM courses WHERE id = ?", [result[0].insertId]);

        if (!course.length) {
            return res.status(500).send("Could not create course");
        }
        return res.status(201).send("Course Created Successfully")

    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}


export default createCourse;