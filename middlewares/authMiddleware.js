import {errorResponse} from "../helpers/responseHelper.js";
import statusCode from "../helpers/statusCodeHelper.js";
import TokenService from "../services/tokenService.js";

export async function AuthMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = await TokenService.getToken(req)

        if (!token) {
            return errorResponse(res, {
                status: statusCode.UNAUTHORIZED,
                errors: ['не передан токен']
            })
        }


        return next() //todo добавить проверку по необходимости
    } catch (e) {
        console.log('AuthMiddleware error', e)

        return errorResponse(res, {
            status: statusCode.UNAUTHORIZED,
            errors: ["пользователь не авторизован *"]
        })
    }
}