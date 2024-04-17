import {verifyUser} from "../helpers/authHelper.js";
import {errorResponse} from "../helpers/responseHelper.js";
import statusCode from "../helpers/statusCodeHelper.js";

import {NextFunction, Response} from "express";
import {CustomRequest} from "../types.js";
import WEBFOLIO_API from "../models/index.js";

export default async function (req: CustomRequest, res:Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const {accessToken, refreshToken} = req

        if (!accessToken) {
            return errorResponse(res, {
                status: statusCode.UNAUTHORIZED,
                errors: ["user unauthorized"]
            })
        }
        console.log('AUTH MIDDLEWARE', {
            accessToken, refreshToken
        })
        const verifiedUser = verifyUser(accessToken)
        const _id = verifiedUser ? verifiedUser?._id : undefined
        console.log('verifiedUser', verifiedUser)

        if (!_id) {
            return errorResponse(res, {
                status: statusCode.UNAUTHORIZED,
                errors: ["token expired"]
            })
        }

        const user = await WEBFOLIO_API.User.findById(_id)

        if (!user) {
            return errorResponse(res, {
                status: statusCode.NOT_FOUND,
                errors: ["user not found. Unauthorized"]
            })
        }
        req.user = user

        next()
    } catch (e) {
        console.log('authMiddleware error', e)
        return errorResponse(res, {
            status: statusCode.UNAUTHORIZED,
            errors: ["authMiddleware error"]
        })
    }
}