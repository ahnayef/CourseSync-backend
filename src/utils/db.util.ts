import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../constants/db.constants';

export const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection(DB_CONFIG);
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); 
    }
};
