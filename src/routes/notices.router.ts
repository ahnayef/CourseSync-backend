import { Router } from "express";
import createNotice from "../controllers/notices/create";
import getNotice from "../controllers/notices/get";
import deleteNotice from "../controllers/notices/delete";


const NoticesRouter = Router();

NoticesRouter.post('/create', createNotice);
NoticesRouter.get('/get', getNotice);
NoticesRouter.delete('/delete/:id', deleteNotice);




export { NoticesRouter };