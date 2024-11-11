import { connectToDatabase } from "../../utils/db.util";

const getAllCourses = async (req: any, res: any) => {
    try {
        const db = await connectToDatabase();

        const [rows]: any = await db.query("SELECT * FROM courses");

        console.log(rows);
        return res.json({
            data: rows
        });

    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export default getAllCourses;