import { Router, Request, Response } from "express";
import { UsersRouter } from "./user.router";
import { CoursesRouter } from "./courses.router";
import authMiddleware from "../middlewares/authMiddleware";
import { NoticesRouter } from "./notices.router";
import { SchedulesRouter } from "./schedules.router";
import { DiscussionsRouter } from "./disscussion.router";

const router = Router();

router.get('/health', (req: Request, res: any) => {
    return res.status(200).json({
        status: 'ok',
        device: req.headers.device,
    });
});

router.use('/users', UsersRouter);
router.use('/courses', authMiddleware, CoursesRouter);
router.use('/notices', authMiddleware, NoticesRouter);
router.use('/schedules', authMiddleware, SchedulesRouter);
router.use('/discussion', authMiddleware, DiscussionsRouter);


export { router };