import {Router} from "express";
import {AuthMiddleware} from "../middlewares/authMiddleware.js";

import {routeNames} from "../helpers/routesHelper.js";
import WorkController from "../controllers/workController.js";

const router: Router = Router()
    .get(
        routeNames.WORKS.GET_ALL,
        WorkController.getAll
    )
    .get(
        routeNames.WORKS.GET_ONE,
        WorkController.getOne
    )
    .post(
        routeNames.WORKS.CREATE,
        AuthMiddleware,
        WorkController.create
    )
    .patch(
        routeNames.WORKS.UPDATE,
        AuthMiddleware,
        WorkController.update
    )
    .delete(
        routeNames.WORKS.DELETE,
        AuthMiddleware,
        WorkController.delete
    )

export default router