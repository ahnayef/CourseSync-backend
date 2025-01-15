import { connectToDatabase } from "../../utils/db.util";

const deleteUser = async (req: any, res: any) => {

    try {

        const { user } = req;

        if (user.role !== 'admin') {
            return res.status(403).send('You are not authorized to perform this action');
        }

        const { id } = req.params;

        const db = await connectToDatabase();

        const [rows]: any = await db.query("DELETE FROM users WHERE id = ?", [id]);

        if (!rows.affectedRows) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send("User deleted successfully");

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }

}

export default deleteUser;