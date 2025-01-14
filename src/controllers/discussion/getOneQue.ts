import { connectToDatabase } from "../../utils/db.util";

const getOneQue = async (req: any, res: any) => {

    try {
        const { id } = req.params;

        const db = await connectToDatabase();

        const [rows]: any = await db.query("SELECT q.*, u.name as userName FROM questions q JOIN users u ON q.asked_by = u.id WHERE q.id = ?", [id]);

        if (!rows.length) {
            return res.status(404).send("Question not found");
        }

        return res.json({
            data: rows[0]
        });

    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message);
    }

}

export default getOneQue;