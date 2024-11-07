import { Router } from "express";
import Login from "../controllers/login";

const UsersRouter = Router();

// UsersRouter.get('/profile', );

UsersRouter.post('/login', Login)

export { UsersRouter };