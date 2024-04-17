import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import ContactController from "../controllers/contactController.js";

const router = Router()

    .get('/contacts', ContactController.get)
    .post('/contacts', authMiddleware, ContactController.create)
    .patch('/contacts/:id', authMiddleware, ContactController.update)
    .delete('/contacts/:id', authMiddleware, ContactController.delete)

export default router