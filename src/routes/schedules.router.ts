import { Router } from "express";

import createSchedule from "../controllers/schedules/create";
import getSchedule from "../controllers/schedules/get";


const SchedulesRouter = Router();

SchedulesRouter.get('/get', getSchedule);
SchedulesRouter.post('/create', createSchedule);




export { SchedulesRouter  };