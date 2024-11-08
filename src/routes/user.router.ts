import { Router } from "express";
import Login from "../controllers/login";
import Register from "../controllers/resgister";

const UsersRouter = Router();

// UsersRouter.get('/profile', );

UsersRouter.post('/login', Login)

UsersRouter.post('/register', Register)

export { UsersRouter };