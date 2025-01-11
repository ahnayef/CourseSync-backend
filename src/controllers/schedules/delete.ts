import { connectToDatabase } from "../../utils/db.util";

const deleteSchedule = async (req: any, res: any) => {
    try {

        const { user } = req;

        const { id } = req.params;

        if (user.role !== "hod") {
            return res.status(403).send("You are not authorized to perform this action");
        }

        const db = await connectToDatabase();

        const [result]: any = await db.query("DELETE FROM schedules WHERE id = ?", [id]);

        if (!result.affectedRows) {
            return res.status(404).send("No schedules found");
        }

        return res.status(200).send("Schedule deleted successfully")




    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export default deleteSchedule;