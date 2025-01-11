import { Router } from "express";

import createSchedule from "../controllers/schedules/create";
import getSchedule from "../controllers/schedules/get";
import hodGet from "../controllers/schedules/hodGet";


const SchedulesRouter = Router();

SchedulesRouter.get('/get', getSchedule);
SchedulesRouter.get('/hodGet/:id', hodGet);
SchedulesRouter.post('/create', createSchedule);




export { SchedulesRouter };