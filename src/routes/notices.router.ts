import { Router } from "express";
import createNotice from "../controllers/notices/create";
import getNotice from "../controllers/notices/get";


const NoticesRouter = Router();

NoticesRouter.post('/create', createNotice);
NoticesRouter.get('/get/:identification', getNotice);



export { NoticesRouter };