import {errorResponse, setCookie, successResponse} from "../helpers/responseHelper.js";

import statusCode from "../helpers/statusCodeHelper.js";
import AuthService from "../services/authService.js";
import TokenService from "../services/tokenService.js";
import DocumentFieldService from "../services/documentFieldService.js";

import {CustomRequest} from "../types/index.js";
import {Response} from "express";
import {PAGE_ME} from "../models/index.js";

class AuthController {
    async login(req: CustomRequest, res: Response) {
        try {
            const fields = DocumentFieldService.requestAuthFields(req)

            if (!fields?.login || !fields?.password) {
                return errorResponse(res, {
                    status: statusCode.UNAUTHORIZED,
                    errors: ['required fields not send' + [!fields?.login && 'login', !fields?.password && 'password'].join(', ')]
                })
            }

            const user = await PAGE_ME.User.findOne({login: fields.login})

            if (!user) {
                return errorResponse(res, {
                    status: statusCode.UNAUTHORIZED,
                    errors: ['user not found']
                })
            }

            const isValidPassword = await AuthService.comparePassword({
                requestPass: fields.password,
                userPass: user.password
            })

            if (!isValidPassword) {
                return errorResponse(res, {
                    status: statusCode.UNAUTHORIZED,
                    errors: ['wrong password']
                })
            }

            const newToken = await TokenService.createAndSave(req, user?._id)

            if (!newToken) {
                return errorResponse(res, {
                    errors: ['save token error']
                })
            }

            user.token = newToken._id
            await user.save()

            setCookie(res, {
                name: 'token',
                value: newToken.tokenValue
            })

            return successResponse(res, {
                status: statusCode.OK
            })
        } catch (e) {
            console.log('error', e)
            return errorResponse(res, {
                errors: ['login error', e]
            })
        }
    }

    async logout(req: CustomRequest, res: Response) {
        try {
            const {token} = req

            const foundedToken = await PAGE_ME.Token.findOneAndDelete({
                tokenValue: token
            })

            if (!foundedToken) {
                return errorResponse(res, {
                    errors: ['logout error']
                })
            }

            return successResponse(res, {
                status: statusCode.OK
            })
        } catch (e) {
            console.log('error', e)
            return errorResponse(res, {
                errors: ['logout error', e]
            })
        }
    }

    async registration(req: CustomRequest, res: Response) {
        try {
            const {login, password} = req.body

            if (!login || !password) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['не переданы обязательные поля' + !login ? 'login' : '' + !password ? 'password' : '']
                })
            }

            const passwordHash = await AuthService.hashPassword(password)

            const newUser = await PAGE_ME.User.create({
                password: passwordHash,
                login
            })

            if (!newUser) {
                return errorResponse(res, {
                    errors: ['create user error']
                })
            }

            return successResponse(res, {
                status: statusCode.CREATED,
                data: newUser
            })
        } catch (e) {
            console.log('error', e)
            return errorResponse(res, {
                errors: ['create user error', e]
            })
        }
    }
}

export default new AuthController()