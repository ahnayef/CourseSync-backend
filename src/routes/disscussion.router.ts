import { Router } from "express";
import { getCourseQuestions, getGeneralQuestions } from "../controllers/discussion/getQuestions";
import { getAnswers } from "../controllers/discussion/getAnswers";
import getOneQue from "../controllers/discussion/getOneQue";
import deleteQuestion from "../controllers/discussion/deleteQuestion";

const DiscussionsRouter = Router();

DiscussionsRouter.get('/questions/:session/:department', getGeneralQuestions);
DiscussionsRouter.get('/questions/:course_id', getCourseQuestions);
DiscussionsRouter.get('/question/:id', getOneQue);
DiscussionsRouter.delete('/question/:id', deleteQuestion);
DiscussionsRouter.get('/answers/:question_id', getAnswers);






export { DiscussionsRouter };