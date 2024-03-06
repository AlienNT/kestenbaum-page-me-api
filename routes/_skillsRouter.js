import {Router} from "express";
import {AuthMiddleware} from "../middlewares/authMiddleware.js";

import {routeNames} from "../helpers/routesHelper.js";
import SkillController from "../controllers/skillController.js";

const router = new Router()
    .get(
        routeNames.SKILLS.GET_ALL,
        SkillController.gelAll
    )
    .get(
        routeNames.SKILLS.GET_ONE,
        SkillController.gelOne
    )
    .post(
        routeNames.SKILLS.CREATE,
        AuthMiddleware,
        SkillController.create
    )
    .patch(
        routeNames.SKILLS.UPDATE,
        AuthMiddleware,
        SkillController.update
    )
    .delete(
        routeNames.SKILLS.DELETE,
        AuthMiddleware,
        SkillController.delete
    )
export default router