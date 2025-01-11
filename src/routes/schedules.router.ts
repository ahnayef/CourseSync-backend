import { Router } from "express";

import createSchedule from "../controllers/schedules/create";
import getSchedule from "../controllers/schedules/get";
import hodGet from "../controllers/schedules/hodGet";
import deleteSchedule from "../controllers/schedules/delete";


const SchedulesRouter = Router();

SchedulesRouter.get('/get', getSchedule);
SchedulesRouter.get('/hodGet/:id', hodGet);
SchedulesRouter.post('/create', createSchedule);
SchedulesRouter.delete('/delete/:id', deleteSchedule);




export { SchedulesRouter };