import {errorResponse} from "../helpers/responseHelper.js";
import statusCode from "../helpers/statusCodeHelper.js";
import TokenService from "../services/tokenService.js";
import {Token, User} from "../models/index.js";

export async function AuthMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const responseToken = await TokenService.getToken(req)

        if (!responseToken) {
            return errorResponse(res, {
                status: statusCode.UNAUTHORIZED,
                errors: ['не передан токен']
            })
        }

        const foundedToken = await Token
            .findOne({tokenValue: responseToken})
            .populate('user')
            .lean()

        if (!foundedToken?.user) {
            return errorResponse(res, {
                status: statusCode.UNAUTHORIZED,
                errors: ['пользователь с таким токеном не найден']
            })
        }

        req.user = foundedToken?.user
        req.token = responseToken

        return next()
    } catch (e) {
        console.log('AuthMiddleware error', e)

        return errorResponse(res, {
            status: statusCode.UNAUTHORIZED,
            errors: ["пользователь не авторизован *"]
        })
    }
}