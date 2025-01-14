import { connectToDatabase } from "../../utils/db.util";

const deleteQuestion = async (req: any, res: any) => {

    try {
        const { id } = req.params;

        const db = await connectToDatabase();

        await db.query(
            `DELETE FROM questions WHERE id = ?`,
            [id]
        );

        return res.status(200).send("Question deleted successfully");

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }


}


export default deleteQuestion;