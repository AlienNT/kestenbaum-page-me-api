import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import SkillController from "../controllers/skillController.js";

const router = Router()

    .get('/skills', SkillController.get)
    .post('/skills', authMiddleware, SkillController.create)
    .patch('/skills/:id', authMiddleware, SkillController.update)
    .delete('/skills/:id', authMiddleware, SkillController.delete)

export default router