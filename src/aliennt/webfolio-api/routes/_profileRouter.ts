import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import profileController from "../controllers/profileController.js";

const router = Router()
    .get('/profile', profileController.get)
    .patch('/profile', authMiddleware, profileController.update)
export default router