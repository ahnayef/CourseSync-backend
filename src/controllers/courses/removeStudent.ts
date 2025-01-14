import { connectToDatabase } from "../../utils/db.util";

const removeStudent = async (req: any, res: any) => {
    try {
        const { courseId, studentId } = req.query;

        if (!courseId || !studentId) {
            throw new Error("Missing required fields");
        }
        const db = await connectToDatabase();

        const [course]: any = await db.query("SELECT * FROM courses WHERE id = ?", [courseId]);
        if (!course) {
            throw new Error("Course not found");
        }

        const [student]: any = await db.query("SELECT * FROM users WHERE id = ?", [studentId]);
        if (!student) {
            throw new Error("Student not found");
        }

        const [result]: any = await db.query("DELETE FROM enroll WHERE course_id = ? AND student_id = ?", [courseId, studentId]);


        if (result.affectedRows === 0) {
            throw new Error("Student not enrolled in course");
        }

        return res.status(200).send("Student removed from course");


    }catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default removeStudent;