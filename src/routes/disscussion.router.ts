import { Router } from "express";
import { getGeneralQuestions } from "../controllers/discussion/getQuestions";
import { getAnswers } from "../controllers/discussion/getAnswers";

const DiscussionsRouter = Router();

DiscussionsRouter.get('/questions/:session/:department', getGeneralQuestions);
DiscussionsRouter.get('/answers/:question_id', getAnswers);






export { DiscussionsRouter };