import {Router} from "express";
import {routeNames} from "../helpers/routesHelper.js";
import AuthController from "../controllers/authController.js";
import {AuthMiddleware} from "../middlewares/authMiddleware.js";

const router = new Router()
    .post(
        routeNames.AUTH.LOGIN,
        AuthController.login
    )
    .get(
        routeNames.AUTH.LOGOUT,
        AuthMiddleware,
        AuthController.logout
    )
    .post(
        routeNames.AUTH.REGISTRATION,
        AuthController.registration
    )
export default router