import { connectToDatabase } from "../../utils/db.util";

const getOne = async (req: any, res: any) => {

    const { id } = req.params;
    console.log(id);
    try {
        const db = await connectToDatabase();

        const [rows]: any = await db.query("SELECT * FROM courses WHERE id = ?", [id]);

        if (!rows.length) {
            return res.status(404).send("Course not found");
        }
        console.log(rows[0]);
        return res.json({
            data: rows[0]
        });
    } catch (error: any) {
        res.status(500).send(error.message);
    }

};

export default getOne;