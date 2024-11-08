import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './utils/db.util';
import { router } from './routes/routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(cors({
    origin: clientOrigin, //Only our client
    credentials: true,
}));



const startServer = async () => {
    try {
        await connectToDatabase();
        console.log('Connected to the database successfully!');

        app.use('/api', router);

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${PORT} and on the LAN.`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

startServer();
