import config from "../config/index.js";
import jwt, {JwtPayload} from "jsonwebtoken";
import bcrypt from "bcrypt"

import {randomUUID} from "node:crypto"

import {Request} from "express";
import {UserDocument} from "../models/types.js";
import {Id} from "../../../types.js";

export function generateAccessToken(_id: Id) {
    const payload = {_id}
    return jwt.sign(payload, config.SECRET_KEY, {expiresIn: process.env.PROD ? '2m' : '1m'})
}

export function generateRefreshToken() {
    return randomUUID()
}

export const decryptAccessToken = (token: string) => {
    return jwt.verify(token, config.SECRET_KEY)
}

export function decryptTokenData(req: Request) {
    const authorization = req.headers.authorization
    return authorization ? decryptAccessToken(authorization.split(' ')[1]) : null;
}

export function verifyUser(token: string): JwtPayload | null {
    try {
        const verify = jwt.verify(token, config.SECRET_KEY)
        return typeof verify === "string" ? null : verify;
    } catch (e) {
        console.log('token expired')
        return null
    }
}

export function getToken(req: Request) {
    return req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined
}

export function getCookie(req: Request, cookieName: string) {
    return req?.cookies[cookieName]
}

export function getPublicAuthFields(user: UserDocument) {
    const {_id} = user

    return {_id}
}

export function getHash(string: string): string {
    return bcrypt.hashSync(string, 7)
}

export function comparePassword(requestPass: string, userPass: string): boolean {
    return bcrypt.compareSync(requestPass, userPass)
}