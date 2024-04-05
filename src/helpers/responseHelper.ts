import statusCode from "./statusCodeHelper.js";
import config from "../config.js";
import {CookieOptions, Response} from "express";

const cookieConfig: CookieOptions = {
    secure: config.IS_COOKIE_SECURE,
    httpOnly: true,
    expires: config.REFRESH_TOKEN_EXPIRES,
}

interface ErrorResponseParams {
    status?: number,
    errors?: string[] | any
}

export function errorResponse(response: Response, {
    status = 500,
    errors = ['request error']
}: ErrorResponseParams) {
    return response.status(status).json({data: {errors}, status})
}

interface SuccessResponseParams {
    status?: number,
    data?: any
}

export function successResponse(response: Response, {
    status = statusCode.OK,
    data
}: SuccessResponseParams) {
    return response.status(status).json({data, status})
}

interface SetCookieParams {
    name: string
    value: string
    config?: CookieOptions
}
export function setCookie(response: Response, {
    name = '',
    value = '',
    config = cookieConfig
}: SetCookieParams): void {
    response.cookie(name, value, config)
}