// src/socketHandler.ts
import { Server, Socket } from 'socket.io';
import { createAnswer, createQuestion } from '../controllers/discussion/message';


interface JoinRoomParams {
    session?: string;
    department?: string;
    question_id?: number;
}

export const handleSocketConnection = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`New client connected: ${socket.id}`);

        // Handle joining a room
        socket.on('joinRoom', async (params: JoinRoomParams) => {
            const { session, department, question_id } = params;
            let room: string | null = null;

            if (question_id) {
                room = `q_${question_id}`;
            } else if (session && department) {
                room = `${session}${department}`;
            }

            if (room) {
                // Leave all existing rooms except the socket's own room
                const rooms = Array.from(socket.rooms);
                rooms.forEach(r => {
                    if (r !== socket.id) {
                        socket.leave(r);
                        console.log(`Socket ${socket.id} left room: ${r}`);
                    }
                });

                // Join the new room
                socket.join(room);
                console.log(`Socket ${socket.id} joined room: ${room}`);
            } else {
                socket.emit('error', { message: 'Invalid room parameters. Provide either question_id or session and department.' });
            }
        });

        // Handle sending a new question
        socket.on('sendQuestion', async (data) => {
            const { content, asked_by, session, department} = data;


            console.log(content, session, department, asked_by);


            if (!session || !department) {
                socket.emit('error', { message: 'Session and department are required to post a question.' });
                return;
            }

            try {
                const newQuestion = await createQuestion({
                    content,
                    asked_by,
                    session,
                    department,
                });
                // Emit the new question to the session-department room
                const room = `${session}${department}`;
                io.to(room).emit('newQuestion', newQuestion);
            } catch (error) {
                console.error('Error sending question:', error);
                socket.emit('error', { message: 'Failed to send question.' });
            }
        });

        // Handle sending a new answer
        socket.on('sendAnswer', async (data) => {
            const { content, question_id, answered_by } = data;

            try {
                const newAnswer = await createAnswer({
                    content,
                    answered_by: parseInt(answered_by, 10),
                    question_id,
                });

                // Emit the new answer to the specific question room
                const room = `q_${question_id}`;
                console.log('Emitting to room:', room, newAnswer);
                io.to(room).emit('newAnswer', newAnswer);
            } catch (error) {
                console.error('Error sending answer:', error);
                socket.emit('error', { message: 'Failed to send answer.' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};