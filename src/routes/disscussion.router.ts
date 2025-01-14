import { Router } from "express";
import { getGeneralQuestions } from "../controllers/discussion/getQuestions";
import { getAnswers } from "../controllers/discussion/getAnswers";
import getOneQue from "../controllers/discussion/getOneQue";

const DiscussionsRouter = Router();

DiscussionsRouter.get('/questions/:session/:department', getGeneralQuestions);
DiscussionsRouter.get('/question/:id', getOneQue);
DiscussionsRouter.get('/answers/:question_id', getAnswers);






export { DiscussionsRouter };