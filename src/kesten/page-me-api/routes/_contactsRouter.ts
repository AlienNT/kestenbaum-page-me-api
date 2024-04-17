import {Router} from "express";
import {AuthMiddleware} from "../middlewares/authMiddleware.js";

import {routeNames} from "../helpers/routesHelper.js";
import ContactController from "../controllers/contactController.js";

const router: Router = Router()
    .get(
        routeNames.CONTACTS.GET_ALL,
        ContactController.gelAll
    )
    .get(
        routeNames.CONTACTS.GET_ONE,
        ContactController.gelOne
    )
    .post(
        routeNames.CONTACTS.CREATE,
        AuthMiddleware,
        ContactController.create
    )
    .patch(
        routeNames.CONTACTS.UPDATE,
        AuthMiddleware,
        ContactController.update
    )
    .delete(
        routeNames.CONTACTS.DELETE,
        AuthMiddleware,
        ContactController.delete
    )
export default router