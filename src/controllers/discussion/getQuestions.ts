import { connectToDatabase } from "../../utils/db.util";

export const getGeneralQuestions = async (req: any, res: any) => {
    const { session, department } = req.params;
    const db = await connectToDatabase()

    // Validate room parameters
    if (!(session && department)) {
        return res.status(400).send('Invalid parameters.');
    }

    try {

        const [rows]: any = await db.query('SELECT q.*, u.name as userName FROM questions q JOIN users u ON q.asked_by = u.id WHERE q.session = ? AND q.department = ? ORDER BY q.created_at ASC', [session, department]);


        res.json({
            data: rows,
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};