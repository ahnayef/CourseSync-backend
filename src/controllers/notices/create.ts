import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";

const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    courseId: Joi.string().allow(null).optional()
})

const createNotice = async (req: any, res: any) => {

    try {

        const { error, value } = schema.validate(req.body);
        const { id, role } = req.user;

        if (role !== "cr" && role !== "teacher") {
            return res.status(403).send("You are not authorized to create a notice");
        }

        if (error) {
            return res.status(400).send(error.message);
        }


        const db = await connectToDatabase();

        const [user]: any = await db.query("SELECT session, department FROM users WHERE id = ?", [id]);

        const { title, content, courseId } = value;


        const result: any = await db.query(
            "INSERT INTO notices (title, content, session, department, course_id) VALUES (?, ?, ?, ?, ?)",
            [title, content, user[0].session, user[0].department, courseId]
        )


        const [notice]: any = await db.query("SELECT * FROM notices WHERE id = ?", [result[0].insertId]);

        if (!notice.length) {
            return res.status(500).send("Could not create notice");
        }

        return res.status(201).send("Notice Created Successfully");


    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }



}

export default createNotice;