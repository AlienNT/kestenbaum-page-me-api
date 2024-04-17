import {Router} from "express";
import stayAwakeController from "../controllers/stayAwakeController.js";

const router = Router()
    .get('/stay-awake', stayAwakeController.stayAwayRequest)

export default router