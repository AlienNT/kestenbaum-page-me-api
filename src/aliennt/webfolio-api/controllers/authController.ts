import {errorResponse, setCookie, successResponse} from "../helpers/responseHelper.js";
import {comparePassword, getHash} from "../helpers/authHelper.js";

import WEBFOLIO_API from "../models/index.js";
import statusCode from "../helpers/statusCodeHelper.js";
import TokenService from "../services/tokenService.js";
import FieldsService from "../services/fieldsService.js";

import {Request, Response} from "express";
import {CustomRequest} from "../types.js";

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const {password, email} = req?.body

            const user = await WEBFOLIO_API.User.findOne({email})

            if (!user) {
                return errorResponse(res, {
                    status: statusCode.NOT_FOUND,
                    errors: ['user not found']
                })
            }

            const isCorrectPassword = comparePassword(password, user?.password)

            if (!isCorrectPassword) {
                return errorResponse(res, {
                    errors: ['incorrect password']
                })
            }

            const tokens = await TokenService.createTokens({
                req,
                userId: user?._id
            })

            if (!tokens) {
                return errorResponse(res, {
                    errors: ['get token error']
                })
            }
            setCookie(res, {
                name: 'refreshToken',
                value: tokens?.refreshToken?.value
            })

            await TokenService.saveTokenInUser({
                user,
                tokenId: tokens?.refreshToken?._id
            })

            return successResponse(res, {
                data: {
                    ...FieldsService.userPublicFields(user),
                    accessToken: tokens?.accessToken
                }
            })
        } catch (e) {
            console.log('AuthController LOGIN error', e)
            return errorResponse(res, {errors: ['login error']})
        }
    }

    async registration(req: Request, res: Response) {
        try {
            console.log(req?.body)

            const existedUser = await WEBFOLIO_API.User.findOne({email: req?.body?.email})

            if (existedUser) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['user already exist']
                })
            }

            const newUser = await WEBFOLIO_API.User.create({
                email: req?.body?.email,
                password: getHash(req?.body?.password)
            })

            if (!newUser) {
                return errorResponse(res, {
                    errors: ['user create error']
                })
            }

            return successResponse(res, {
                data: newUser
            })
        } catch (e) {
            console.log('AuthController REGISTRATION error', e)
            return errorResponse(res, {
                errors: ['registration error']
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            return console.log(req?.body)
        } catch (e) {
            console.log('AuthController DELETE error', e)
            return errorResponse(res, {
                errors: ['delete user error']
            })
        }
    }

    async refresh(req: CustomRequest, res: Response) {
        try {
            const {refreshToken} = req
            console.log('REFRESH TOKEN', {old: refreshToken})

            if (!refreshToken) {
                return errorResponse(res, {
                    status: statusCode.UNAUTHORIZED,
                    errors: ['unauthorized']
                })
            }
            const targetToken = await WEBFOLIO_API.Token.findOne({value: refreshToken}).populate('user')

            if (targetToken?.user) {
                req.userId = targetToken?.user?._id
            }

            if (!targetToken?.value || !targetToken?.user) {
                return errorResponse(res, {
                    errors: ['invalid token']
                })
            }

            const newTokens = await TokenService.refreshToken({
                req: req,
                user: targetToken?.user,
                oldToken: targetToken?.value
            })

            if (!newTokens) {
                return errorResponse(res, {
                    status: statusCode.UNAUTHORIZED,
                    errors: ['unauthorized']
                })
            }

            setCookie(res, {
                name: 'refreshToken',
                value: newTokens.refreshToken.value
            })
            return successResponse(res, {
                data: {
                    accessToken: newTokens.accessToken
                }
            })
        } catch (e) {
            console.log('authController REFRESH error', e)
            return errorResponse(res, {
                errors: ['refresh tokens error']
            })
        }
    }
}

export default new AuthController()