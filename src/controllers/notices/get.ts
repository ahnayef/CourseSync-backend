import { connectToDatabase } from "../../utils/db.util";

const getNotice = async (req: any, res: any) => {

    const { session, dept, courseId } = req.query


    try {

        const db = await connectToDatabase();


        const query = courseId ? "SELECT * FROM notices WHERE course_id = ? ORDER BY created_at DESC" : "SELECT * FROM notices WHERE department = ?  AND session = ? AND course_id IS NULL ORDER BY created_at DESC";

        const [rows]: any = await db.query(query, courseId ? [courseId] : [dept, session]);

        if (!rows.length) {
            return res.status(404).send("No notices yet!");
        }
        return res.json({
            data: rows
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }

}

export default getNotice;