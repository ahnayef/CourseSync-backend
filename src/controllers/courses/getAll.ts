import { connectToDatabase } from "../../utils/db.util";

const getAll = async (req: any, res: any) => {

    const { user } = req;

    try {

        if (user.role !== 'hod') {
            return res.status(401).send('Unauthorized');
        }


        const db = await connectToDatabase();


        const [rows]: any = await db.query("SELECT id, name FROM courses");
        return res.json({
            data: rows
        });


    }catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default getAll;