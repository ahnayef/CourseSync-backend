import { Router } from "express";
import Login from "../controllers/user/login";
import Register from "../controllers/user/resgister";
import authMiddleware from "../middlewares/authMiddleware";
import hodGet from "../controllers/user/hodGet";
import getOne from "../controllers/user/getOne";
import updateRole from "../controllers/user/updateRole";
import banUser from "../controllers/user/ban";

const UsersRouter = Router();

// UsersRouter.get('/profile', authMiddleware, getProfile);

UsersRouter.post('/login', Login)

UsersRouter.post('/register', Register)

UsersRouter.get('/hodGet', authMiddleware, hodGet)

UsersRouter.get('/getOne/:id', authMiddleware, getOne)

UsersRouter.put('/updateRole', authMiddleware, updateRole)

UsersRouter.get('/ban/:id', authMiddleware, banUser)

export { UsersRouter };