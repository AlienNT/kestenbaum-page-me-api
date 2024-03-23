import {Router} from "express";
import {routeNames} from "../helpers/routesHelper.js";
import AuthController from "../controllers/authController.js";

const router = new Router()
    .post(routeNames.AUTH.LOGIN, AuthController.login)
    .post(routeNames.AUTH.LOGOUT, AuthController.logout)
    .post(routeNames.AUTH.REGISTRATION, AuthController.registration)
export default router