import statusCode from "./statusCodeHelper.js";
import config from "../config/index.js";
import {CookieOptions, Response} from "express";

export const cookieConfig: CookieOptions = {
    secure: config.IS_COOKIE_SECURE,
    httpOnly: true,
    maxAge: config.REFRESH_TOKEN_EXPIRES.number,
    expires: config.REFRESH_TOKEN_EXPIRES.date,
    sameSite: config.IS_COOKIE_SECURE ? "none" : 'lax'
}


export function successResponse(response: Response, {
    status = statusCode.OK,
    data
}: { status?: number, data?: any }) {
    return response.status(status).json({data, status})
}

export function errorResponse(response: Response, {
    status = statusCode.BAD_REQUEST,
    errors
}: { status?: number, errors: any[] | any }) {
    return response.status(status).json({errors, status})
}

interface SetCookie {
    name: string,
    value: string,
    config?: CookieOptions
}

export function setCookie(response: Response, {name, value, config = cookieConfig}: SetCookie) {
    response.cookie(name, value, config)
}

interface ClearCookie {
    name: string,
    config?: CookieOptions
}

export function clearCookie(response: Response, {name, config = cookieConfig}: ClearCookie) {
    response.clearCookie(name, config)
}

export function checkRequireFields(fields: any, errorMessage: any) {
    return Object.keys(fields).map(key =>
        !fields[key]?.length ?
            `${errorMessage} ${key}` :
            null
    ).filter(item => !!item)
}

export function exclude(fields: string[]) {
    return setFields(fields, 0)
}

export function include(fields: string[]) {
    return setFields(fields, 1)
}

function setFields(fields: any, value: any) {
    const object: any = {}

    fields.forEach((field: any) => {
        object[field] = value
    })

    return object
}

export const returnBefore = {
    returnDocument: 'before'
}
export const returnAfter = {
    returnDocument: 'after'
}