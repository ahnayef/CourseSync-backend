import { connectToDatabase } from "../../utils/db.util";

const getAllHODs = async (req: any, res: any) => {
    try {
        const { user } = req;
        if (user.role !== 'admin') {
            return res.status(403).send('You are not authorized to perform this action');
        }
        const db = await connectToDatabase();
        const [users]: any = await db.query(`SELECT id, name, email, department FROM users WHERE role = 'hod'`);

        if (!users.length) {
            return res.status(404).send("No HODs found");
        }
        return res.json({
            data: users
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default getAllHODs;