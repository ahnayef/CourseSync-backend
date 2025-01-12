import { connectToDatabase } from "../../utils/db.util";

interface CreateQuestionParams {
    content: string;
    asked_by: number;
    session: string;
    department: string;
}

interface CreateAnswerParams {
    content: string;
    answered_by: number;
    question_id: number;
}

const db = connectToDatabase();

export const createQuestion = async (params: CreateQuestionParams) => {
    const { content, asked_by, session, department } = params;
    console.log('createQuestion', content, asked_by, session, department);

    const [result] = await (await db).query(
        'INSERT INTO questions (content, asked_by, session, department) VALUES (?, ?, ?, ?)',
        [content, asked_by, session, department]
    );

    const insertId = (result as any).insertId;

    // Fetch the user's name
    const [userRows]: any = await (await db).query('SELECT name FROM users WHERE id = ?', [asked_by]);
    const userName = userRows[0]?.name || 'Unknown';

    const newQuestion = {
        id: insertId,
        content,
        asked_by,
        userName,
        created_at: new Date(),
    };

    return newQuestion;
};

export const createAnswer = async (params: CreateAnswerParams) => {
    const { content, answered_by, question_id } = params;

    const [result]:any = await (await db).query(
        'INSERT INTO answers (content, answered_by, question_id) VALUES (?, ?, ?)',
        [content, answered_by, question_id]
    );

    const insertId = result .insertId;

    // Fetch the user's name
    const [userRows]: any = await (await db).query('SELECT name FROM users WHERE id = ?', [answered_by]);
    const userName = userRows[0]?.name || 'Unknown';

    const newAnswer = {
        id: insertId,
        content,
        answered_by,
        userName,
        created_at: new Date(),
    };

    return newAnswer;
};