import { connectToDatabase } from "../../utils/db.util";

const hodGet = async (req: any, res: any) => {

    const { user } = req;

    try {

        if (user.role !== 'hod') {
            return res.status(401).send('Unauthorized');
        }


        const db = await connectToDatabase();

        const [dbUser]: any = await db.query("SELECT * FROM users WHERE id= ?", [user.id]);

        const [rows]: any = await db.query("SELECT * FROM courses WHERE department= ?", [dbUser[0].department]);
        return res.json({
            data: rows
        });


    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export default hodGet;