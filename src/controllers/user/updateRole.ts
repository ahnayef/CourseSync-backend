import { connectToDatabase } from "../../utils/db.util";

const updateRole = async (req: any, res: any) => {

    const { id, role } = req.body;
    const { user: currentUser } = req;

    try {
        if (currentUser.role !== 'hod' && currentUser.role !== 'admin') {
            return res.status(401).send('You  are not authorized to perform this action');
        }
        const db = await connectToDatabase();

        db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);

        res.status(200).send('User updated successfully')

    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message);
    }
}
export default updateRole;