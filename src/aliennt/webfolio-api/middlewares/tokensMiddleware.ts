import {getCookie, getToken} from "../helpers/authHelper.js";
import TokenController from "../controllers/tokenController.js";

import {NextFunction} from "express";
import {CustomRequest} from "../types.js";

export default async function (req: CustomRequest, res: Response, next: NextFunction) {
    console.log('TOKEN MIDDLEWARE')
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const accessToken = getToken(req)
        const refreshToken = getCookie(req, 'refreshToken')

        const savedToken = await TokenController.get(refreshToken)

        req.accessToken = accessToken
        req.refreshToken = refreshToken
        req.savedToken = savedToken ? savedToken.value : undefined
        req.isAdmin = !!savedToken

        next()
    } catch (e) {
        console.log('tokenController error', e)
        next()
    }
}