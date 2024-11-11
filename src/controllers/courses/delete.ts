import { connectToDatabase } from "../../utils/db.util";

const deleteCourse = async (req: any, res: any) => {
    try {
        const db = await connectToDatabase();

        const { id } = req.params;

        const [rows]: any = await db.query("SELECT * FROM courses WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).send("Course not found");
        }

        await db.query("DELETE FROM courses WHERE id = ?", [id]);

        return res.status(200).send("Course Deleted Successfully");

    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export default deleteCourse;