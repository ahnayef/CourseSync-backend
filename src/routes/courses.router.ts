import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import createCourse from "../controllers/courses/create";
import getAllCourses from "../controllers/courses/getAll";

const CoursesRouter = Router();


CoursesRouter.get('/getAll', getAllCourses);

CoursesRouter.post('/create', createCourse);



export { CoursesRouter };