import { Router } from "express";
import createNotice from "../controllers/notices/create";
import getNotice from "../controllers/notices/get";
import deleteNotice from "../controllers/notices/delete";
import createSchedule from "../controllers/schedules/create";


const SchedulesRouter = Router();

SchedulesRouter.post('/create', createSchedule);




export { SchedulesRouter  };