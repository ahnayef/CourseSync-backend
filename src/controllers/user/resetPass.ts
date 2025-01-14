import { connectToDatabase } from "../../utils/db.util";

import bcrypt from 'bcrypt';

const resetPass = async (req: any, res: any) => {

    try {
        const { id } = req.params;

        const db = await connectToDatabase();


        const pass = await bcrypt.hash('123456', 10);

        await db.query('UPDATE users SET password = ? WHERE id = ?', [pass, id]);

        return res.status(200).send('Password reset successfully');


    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }

}

export default resetPass;