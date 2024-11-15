import { Router } from "express";
import createCourse from "../controllers/courses/create";
import getAllCourses from "../controllers/courses/getAll";
import deleteCourse from "../controllers/courses/delete";
import getOne from "../controllers/courses/getOne";

const CoursesRouter = Router();


CoursesRouter.get('/getAll', getAllCourses);

CoursesRouter.get('/get/:id', getOne);

CoursesRouter.post('/create', createCourse);

CoursesRouter.delete('/delete/:id', deleteCourse);


export { CoursesRouter };