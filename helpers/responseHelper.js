import statusCode from "./statusCodeHelper.js";
import config from "../config.js";

const cookieConfig = {
    secure: config.IS_COOKIE_SECURE,
    httpOnly: true,
    expires: config.REFRESH_TOKEN_EXPIRES,
}

export function errorResponse(response, {
    status = 500,
    errors = ['request error']
}) {
    return response.status(status).json({data: {errors}, status})
}

export function successResponse(response, {
    status = statusCode.OK,
    data
}) {
    return response.status(status).json({data, status})
}

export function setCookie(response, {
    name = '',
    value = '',
    config = cookieConfig
}) {
    response.cookie(
        name,
        value,
        config
    )
}