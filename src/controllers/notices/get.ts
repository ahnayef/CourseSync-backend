import { connectToDatabase } from "../../utils/db.util";

const getNotice = async (req: any, res: any) => {

    const { identification } = req.params;

    const session = identification.split('+')[0];
    const dept = identification.split('+')[1];

    try {

        const db = await connectToDatabase();

        const [rows]: any = await db.query("SELECT * FROM notices WHERE department = ?  AND session = ? ORDER BY created_at DESC", [dept, session]);

        if (!rows.length) {
            return res.status(404).send("No notices yet!");
        }
        return res.json({
            data: rows
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }

}

export default getNotice;