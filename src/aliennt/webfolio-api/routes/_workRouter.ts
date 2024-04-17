import {Router} from "express";
import WorkController from "../controllers/workController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = Router()

    .get('/works', WorkController.get)
    .post('/works', AuthMiddleware, WorkController.create)
    .patch('/works/:id', AuthMiddleware, WorkController.update)
    .delete('/works/:id', AuthMiddleware, WorkController.delete)

export default router