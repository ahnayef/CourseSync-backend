import { Router } from "express";
import createCourse from "../controllers/courses/create";
import get from "../controllers/courses/get";
import deleteCourse from "../controllers/courses/delete";
import getOne from "../controllers/courses/getOne";
import addStudent from "../controllers/courses/addStudent";
import getPeople from "../controllers/courses/getPeople";
import removeStudent from "../controllers/courses/removeStudent";
import hodGet from "../controllers/courses/hodGet";

const CoursesRouter = Router();


CoursesRouter.get('/get', get);

CoursesRouter.get('/hodGet', hodGet);

CoursesRouter.get('/get/:id', getOne);

CoursesRouter.post('/create', createCourse);

CoursesRouter.delete('/delete/:id', deleteCourse);

CoursesRouter.post('/addStudent', addStudent);

CoursesRouter.delete('/removeStudent', removeStudent);

CoursesRouter.get('/getPeople/:id', getPeople);



export { CoursesRouter };