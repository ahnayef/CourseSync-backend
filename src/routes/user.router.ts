import { Router } from "express";
import Login from "../controllers/user/login";
import Register from "../controllers/user/resgister";
import authMiddleware from "../middlewares/authMiddleware";
import hodGet from "../controllers/user/hodGet";
import getOne from "../controllers/user/getOne";
import updateRole from "../controllers/user/updateRole";
import toggleBan from "../controllers/user/toggleBan";
import resetPass from "../controllers/user/resetPass";
import getTeachers from "../controllers/user/getTeachers";

const UsersRouter = Router();

// UsersRouter.get('/profile', authMiddleware, getProfile);

UsersRouter.post('/login', Login)

UsersRouter.post('/register', Register)

UsersRouter.get('/hodGet', authMiddleware, hodGet)

UsersRouter.get('/getOne/:id', authMiddleware, getOne)

UsersRouter.put('/updateRole', authMiddleware, updateRole)

UsersRouter.put('/toggleBan/', authMiddleware, toggleBan)

UsersRouter.get('/resetPass/:id', authMiddleware, resetPass)

UsersRouter.get('/getTeachers/:dept', authMiddleware, getTeachers)

export { UsersRouter };