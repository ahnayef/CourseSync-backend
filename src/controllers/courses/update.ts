import Joi from "joi";
import { connectToDatabase } from "../../utils/db.util";

const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    code: Joi.string().regex(/^[A-Z]{3}-\d{3,8}$/).required().messages({
        'string.pattern.base': 'Course Code must be in format of AAA-12345678',
    }),
    credit: Joi.string().valid("3", "1.5").required(),
    department: Joi.string().valid("CSE", "BBA", "English", "LLB").required(),
    instructor: Joi.number().required()
})

const updateCourse = async (req: any, res: any) => {

    try {
        const { role } = req.user;

        if (role !== "hod") {
            return res.status(403).send("You are not authorized to update a course");
        }

        const db = await connectToDatabase();

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const { id, name, code, credit, department, instructor } = value;

        const [rows]: any = await db.query("SELECT * FROM courses WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).send("Course not found");
        }

        const result: any = await db.query(
            "UPDATE courses SET code = ?, name = ?, credit = ?, department = ?, instructor = ? WHERE id = ?",
            [code, name, credit, department, instructor, id]
        )


        if (result[0].affectedRows === 0) {
            return res.status(500).send("Could not update course");
        }
        return res.status(200).send("Course Updated Successfully")

    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message);
    }

}

export default updateCourse;