import { Router } from "express";
import createNotice from "../controllers/notices/create";


const NoticesRouter = Router();

NoticesRouter.post('/create', createNotice);



export { NoticesRouter };