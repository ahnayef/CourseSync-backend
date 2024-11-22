import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";


const schema = Joi.object({
    sid: Joi.string().pattern(/^056\d{13}$/).required().messages({
        'string.pattern.base': 'ID must be 16 digits starting with 056',
    }),
    courseId: Joi.string().required(),
})

const addStudent = async (req: any, res: any) => {
    try {

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const db = await connectToDatabase();

        const { sid, courseId } = value;

        const [user]: any = await db.query("SELECT * FROM users WHERE sid = ?", [sid]);

        if (!user.length) {
            return res.status(404).send("User not found");
        }

        const [course]: any = await db.query("SELECT * FROM courses WHERE id = ?", [courseId]);

        if (!course.length) {
            return res.status(404).send("Course not found");
        }

        const [exist]: any = await db.query("SELECT * FROM enroll WHERE student_id = ? AND course_id = ?", [user[0].id, courseId]);

        if (exist.length) {
            return res.status(409).send("Student already enrolled in this course");
        }

        const result: any = await db.query("INSERT INTO enroll (student_id, course_id) VALUES (?, ?)", [user[0].id, courseId]);

        const [enroll]: any = await db.query("SELECT * FROM enroll WHERE id = ?", [result[0].insertId]);

        if (!enroll.length) {
            return res.status(500).send("Could not enroll student in course");
        }

        return res.status(201).send("Student Enrolled Successfully");

    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export default addStudent;