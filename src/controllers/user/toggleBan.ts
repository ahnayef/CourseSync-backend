import { connectToDatabase } from "../../utils/db.util";

const toggleBan = async (req: any, res: any) => {
    const { id, disabled } = req.body;
    const { user: currentUser } = req;

    try {
        if (currentUser.role !== 'hod' && currentUser.role !== 'admin') {
            return res.status(401).send('You are not authorized to perform this action');
        }

        const db = await connectToDatabase();

        await db.query('UPDATE users SET disabled = ? WHERE id = ?', [disabled, id]);

        return res.status(200).send(`User ${disabled ? 'banned' : 'unbanned'} successfully`);

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default toggleBan;
