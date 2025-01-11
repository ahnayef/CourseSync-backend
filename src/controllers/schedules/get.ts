import { connectToDatabase } from "../../utils/db.util";

const getSchedule = async (req: any, res: any) => {

    const { user } = req;

    try {
        const db = await connectToDatabase();

        if (user.role == "hod") {

            const [dbuser]: any = await db.query("SELECT department FROM users WHERE id = ?", [user.id]);


            const [rows]: any = await db.query("SELECT s.id, s.day, s.department, s.session, s.start, s.end, s.room, courses.name AS name, courses.code AS courseCode,  users.name AS teacher FROM schedules AS s INNER JOIN users ON users.id = s.instructor INNER JOIN courses ON courses.id = s.course WHERE s.department = ? ORDER BY s.start", [dbuser[0].department]);

            if (!rows.length) {
                return res.status(404).send("No schedules found");
            }
            return res.json({
                data: rows
            });

        } else if (user.role == "teacher") {

            const [rows]: any = await db.query("SELECT s.id, s.day, s.department, s.session, s.start, s.end, s.room, courses.name AS name, courses.code AS courseCode,  users.name AS teacher FROM schedules AS s INNER JOIN users ON users.id = s.instructor INNER JOIN courses ON courses.id = s.course WHERE s.instructor = ? ORDER BY s.start", [user.id]);

            if (!rows.length) {
                return res.status(404).send("No schedules found");
            }

            return res.json({
                data: rows
            });

        } else if (user.role == "student") {

            const [rows]: any = await db.query("SELECT s.id, s.day, s.department, s.session, s.start, s.end, s.room, courses.name AS name, courses.code AS courseCode,  users.name AS teacher FROM schedules AS s INNER JOIN users ON users.id = s.instructor INNER JOIN courses ON courses.id = s.course INNER JOIN enroll ON enroll.course_id = s.course WHERE enroll.student_id = ? ORDER BY s.start", [user.id]);

            if (!rows.length) {
                return res.status(404).send("No schedules found");
            }

            return res.json({
                data: rows
            });

        }
    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }



}

export default getSchedule;