import { connectToDatabase } from "../utils/db.util";

const Login = async (req: any, res: any) => {
    try {
        const { role, identification, password } = req.body;

        const connection = await connectToDatabase();

        if (role == 'Teacher') {
            const [rows]: any = await connection.query(
                `SELECT email FROM users WHERE email = ?`,
                [identification]
            );

            if (rows.length == 0) {
                res.status(404).send('User not found');
            } else {
                res.status(200).send('User found');
                // TODO: Add the logic for the teacher login
            }
        } // TODO: Add the logic for the student and CR login
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

export default Login;