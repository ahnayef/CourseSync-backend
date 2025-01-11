import { connectToDatabase } from "../../utils/db.util";

const hodGet = async (req: any, res: any) => {
    try {

        const { user } = req;
        const { id } = req.params;

        console.log(id);

        if (user.role !== "hod") {
            return res.status(403).send("Unauthorized");
        }

        const db = await connectToDatabase();

        const [result]: any = await db.query("SELECT * FROM schedules WHERE id = ?", [id]);

        
        if (!result.length) {
            return res.status(404).send("No schedules found");
        }

        console.log(result[0]);

        return res.json({
            data: result[0]
        });



    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default hodGet;