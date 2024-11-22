import { connectToDatabase } from "../../utils/db.util";

const getPeople = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const db = await connectToDatabase();

        const [course]: any = await db.query("SELECT * FROM courses WHERE id = ?", [id]);

        if (!course.length) {
            return res.status(404).send("Course not found");
        }

        const [instructors]: any = await db.query("SELECT name from users where id = ?", [course[0].instructor]);

        const [students]: any = await db.query("SELECT users.id, users.name, users.sid from users INNER JOIN enroll ON users.id = enroll.student_id WHERE enroll.course_id = ?", [course[0].id]);

        return res.json({
            data: {
                instructor: instructors[0],
                students: students
            }
        });

    } catch (error: any) {
        res.status(500).send(error.message);
    }

}

export default getPeople;