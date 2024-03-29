import {errorResponse, setCookie, successResponse} from "../helpers/responseHelper.js";
import {User} from "../models/index.js";

import statusCode from "../helpers/statusCodeHelper.js";
import AuthService from "../services/authService.js";
import TokenService from "../services/tokenService.js";
import DocumentFieldService from "../services/documentFieldService.js";

class AuthController {
    async login(req, res) {
        try {
            const {login, password} = DocumentFieldService.requestAuthFields(req)

            if (!login || !password) {
                return errorResponse(res, {
                    status: statusCode.UNAUTHORIZED,
                    errors: ['required fields not send' + [!login && 'login', !password && 'password'].join(', ')]
                })
            }

            const user = await User.findOne({login})

            if (!user) {
                return errorResponse(res, {
                    status: statusCode.UNAUTHORIZED,
                    errors: ['user not found']
                })
            }

            const isValidPassword = await AuthService.comparePassword({
                requestPass: password,
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
            user.save()

            setCookie(res, {
                name: 'token',
                value: newToken.tokenValue
            })

            return successResponse(res, {
                status: statusCode.OK,
                data: user._id
            })
        } catch (e) {
            console.log('error', e)
            return errorResponse(res, {
                errors: ['login error', e]
            })
        }
    }

    async logout(req, res) {
        try {
        } catch (e) {
            console.log('error', e)
        }
    }

    async registration(req, res) {
        try {
            const {login, password} = req.body

            if (!login || !password) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['не переданы обязательные поля' + !login ? 'login' : '' + !password ? 'password' : '']
                })
            }

            const passwordHash = await AuthService.hashPassword(password)

            const newUser = await User.create({
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

    async refresh(req, res) {
        try {
        } catch (e) {
            console.log('error', e)
        }
    }
}

export default new AuthController()