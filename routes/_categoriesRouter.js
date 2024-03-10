import {Router} from "express";

import {routeNames} from "../helpers/routesHelper.js";
import CategoryController from "../controllers/categoryController.js";

import {AuthMiddleware} from "../middlewares/authMiddleware.js";

const router = new Router()
    .get(
        routeNames.CATEGORIES.GET_ALL,
        CategoryController.get
    )
    .get(
        routeNames.CATEGORIES.GET_WITH_WORKS,
        CategoryController.getWithWorks
    )
    .post(
        routeNames.CATEGORIES.CREATE,
        AuthMiddleware,
        CategoryController.create
    )
    .patch(
        routeNames.CATEGORIES.UPDATE,
        AuthMiddleware,
        CategoryController.update
    )
    .delete(
        routeNames.CATEGORIES.DELETE,
        AuthMiddleware,
        CategoryController.delete
    )
export default router