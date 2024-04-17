import {Router} from "express";
import {AuthMiddleware} from "../middlewares/authMiddleware.js";

import {routeNames} from "../helpers/routesHelper.js";
import AuthController from "../controllers/authController.js";

const router: Router = Router()
    .post(
        routeNames.AUTH.LOGIN,
        AuthController.login
    )
    .get(
        routeNames.AUTH.LOGOUT,
        AuthMiddleware,
        AuthController.logout
    )
/**
 * для разработки
 */
/*.post(
    routeNames.AUTH.REGISTRATION,
    AuthController.registration
)*/
export default router