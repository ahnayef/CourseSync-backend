import { Router, Request, Response } from "express";
import { UsersRouter } from "./user.router";

const router = Router();

router.get('/health', (req: Request, res: any) => {
    return res.status(200).json({
        status: 'ok',
        device: req.headers.device,
    });
});

router.use('/users', UsersRouter);


export { router };