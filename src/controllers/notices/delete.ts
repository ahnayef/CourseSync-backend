import { connectToDatabase } from "../../utils/db.util";

const deleteNotice = async (req: any, res: any) => {
    try {

        const { role } = req.user;

        if (role !== "cr" && role !== "teacher") {
            return res.status(403).send("You are not authorized to perform this action");
        }

        const db = await connectToDatabase();

        const { id } = req.params;

        const [rows]: any = await db.query("SELECT * FROM notices WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).send("Notice not found");
        }

        await db.query("DELETE FROM notices WHERE id = ?", [id]);

        return res.status(200).send("Notice Deleted Successfully");

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default deleteNotice;