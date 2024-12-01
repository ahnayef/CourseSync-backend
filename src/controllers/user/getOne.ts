import { connectToDatabase } from "../../utils/db.util";

const getOne = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const db = await connectToDatabase();

        const [user]: any = await db.query(
            `SELECT name, sid, session, role FROM users WHERE id = ?`,
            [id]
        );

        if (!user.length) {
            return res.status(404).send("User not found");
        }

        return res.json({
            data: user[0]
        });

    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export default getOne;