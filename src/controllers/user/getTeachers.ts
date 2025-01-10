import { connectToDatabase } from "../../utils/db.util";

const getTeachers = async (req: any, res: any) => {

    const { user } = req;
    try {

        if (user.role !== 'hod') {
            return res.status(403).send("You are not authorized to access this resource");
        }

        const db = await connectToDatabase();

        const [rows]: any = await db.query("SELECT id, name FROM users WHERE role = 'teacher'");

        if (!rows.length) {
            return res.status(404).send("No teachers found!");
        }

        return res.json({
            data: rows
        });


    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default getTeachers;