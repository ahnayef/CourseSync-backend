import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './utils/db.util';
import { router } from './routes/routes';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { handleSocketConnection } from './services/socketHandler';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(cors({
    origin: clientOrigin, // Only allow our own client
    credentials: true,
}));

// Create HTTP server : http because we need to use socket.io :)
const server = http.createServer(app);

// Init Socket.io
const io = new SocketIOServer(server, {
    cors: {
        origin: clientOrigin,
        methods: ["GET", "POST"],
    },
});

// Handle Socket.io connections
handleSocketConnection(io); // All socket.io logic is handled in this file ||

// Routes
const startServer = async () => {
    try {
        await connectToDatabase();
        console.log('Connected to the database successfully!');

        app.use('/api', router);

        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${PORT} and on the LAN.`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

startServer();