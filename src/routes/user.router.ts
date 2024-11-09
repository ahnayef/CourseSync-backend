import { Router } from "express";
import Login from "../controllers/login";
import Register from "../controllers/resgister";
import authMiddleware from "../middlewares/authMiddleware";

const UsersRouter = Router();

// UsersRouter.get('/profile', authMiddleware, getProfile);

UsersRouter.post('/login', Login)

UsersRouter.post('/register', Register)

export { UsersRouter };