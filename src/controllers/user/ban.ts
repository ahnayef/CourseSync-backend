import { connectToDatabase } from "../../utils/db.util";

const banUser = async (req: any, res: any) => {
    const { id } = req.params;
    const { user: currentUser } = req;

    try {
        if (currentUser.role !== 'hod' && currentUser.role !== 'admin') {
            return res.status(401).send('You are not authorized to perform this action');
        }

        const db = await connectToDatabase();

        await db.query('UPDATE users SET disabled = true WHERE id = ?', [id]);
        return res.status(200).send('User banned successfully');
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export default banUser;
