import { connectToDatabase } from '../utils/db.util';
import { readFileSync } from 'fs';
import { join } from 'path';

const resetDB = async () => {
    const connection = await connectToDatabase();

    const dropFilePath = join(__dirname, '../sql/drop.sql');
    const dropSQL = readFileSync(dropFilePath, { encoding: 'utf-8' });

    const createFilePath = join(__dirname, '../sql/create.sql');
    const createSQL = readFileSync(createFilePath, { encoding: 'utf-8' });

    try {
        await connection.query(dropSQL);
        console.log('Deleted...');

        const createStatement = createSQL.split(';'); // Had to split the SQL statements because the query method doesn't support multiple statements :/

        for (const statement of createStatement) {
            if (statement.trim() === '') {
                continue;
            }
            await connection.query(statement);
        }

        console.log('DB setted up!');
    } catch (error) {
        console.error('Error while resetting the DB:', error);
    } finally {
        await connection.end();
    }
};

resetDB().catch(console.error);
