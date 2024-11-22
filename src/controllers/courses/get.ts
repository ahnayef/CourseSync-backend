import { connectToDatabase } from "../../utils/db.util";

const get = async (req: any, res: any) => {

    const user = req.user;

    try {
        const db = await connectToDatabase();

        if (user.role === 'teacher') {
            const [rows]: any = await db.query("SELECT * FROM courses WHERE instructor= ?", [user.id]);
            return res.json({
                data: rows
            });
        } else {
            const [rows]: any = await db.query("SELECT * FROM courses INNER JOIN enroll ON courses.id = enroll.course_id WHERE enroll.student_id = ?", [user.id]);

            return res.json({
                data: rows
            });
        }


    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export default get;