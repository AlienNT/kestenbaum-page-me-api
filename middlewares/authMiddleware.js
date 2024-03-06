import {errorResponse} from "../helpers/responseHelper.js";
import statusCode from "../helpers/statusCodeHelper.js";

export function AuthMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        return next() //todo добавить проверку по необходимости
    } catch (e) {
        console.log('AuthMiddleware error', e)

        return errorResponse(res, {
            status: statusCode.UNAUTHORIZED,
            errors: ["user unauthorized *"]
        })
    }
}