import { connectToDatabase } from "../../utils/db.util";

export const getAnswers = async (req: any, res: any) => {
    const { question_id } = req.params;
    const db = connectToDatabase();

    if (!question_id) {
        return res.status(400).json({ message: 'question_id is required.' });
    }

    try {
        const [rows] = await (await db).query(
            'SELECT a.*, u.name as userName FROM answers a JOIN users u ON a.answered_by = u.id WHERE a.question_id = ? ORDER BY a.created_at ASC',
            [parseInt(question_id, 10)]
        );
        res.json({
            data: rows,
        });
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};