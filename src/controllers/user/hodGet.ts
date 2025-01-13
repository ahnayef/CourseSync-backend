import { connectToDatabase } from "../../utils/db.util";

const hodGet = async (req: any, res: any) => {

    const { user } = req;

    try {

        if (user.role !== 'hod') {
            return res.status(403).send("You are not authorized to access this resource");
        }


        const db = await connectToDatabase();
        const [dbUser]: any = await db.query("SELECT * FROM users WHERE id = ?", [user.id]);


        if (!dbUser.length) {
            return res.status(404).send("User not found");
        }

        const [rows]: any = await db.query("SELECT id, name, sid, role FROM users WHERE department = ? AND (role = 'student' OR role = 'cr')", [dbUser[0].department]);


        if (!rows.length) {
            return res.status(404).send("No students found!");
        }

        return res.json({
            data: rows
        });


    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default hodGet;