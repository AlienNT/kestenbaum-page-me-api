import jwt from "jsonwebtoken";

import config from "../config/index.js";
import FieldsService from "./fieldsService.js";
import WEBFOLIO_API from "../models/index.js";

import {randomUUID} from "node:crypto";

import {Request} from "express";
import {UserDocument} from "../models/types.js";
import {Id} from "../../../types.js";

interface CreateTokens {
    req: Request,
    userId: Id
}

interface RefreshTokens {
    req: Request,
    oldToken: string,
    user: any
}

interface SaveTokenInUser {
    user: UserDocument,
    tokenId: Id
}

interface ReplaceTokenInUser {
    user: UserDocument,
    tokenId: Id,
    newTokenId: Id
}

class TokenService {
    generateTokens(userId: Id) {
        try {
            return {
                accessToken: this.generateAccessToken(userId),
                refreshToken: this.generateRefreshToken()
            }
        } catch (e) {
            console.log('TokenService generateTokens error', e)
            return null
        }
    }

    generateAccessToken(userId: Id): string {
        return jwt.sign(
            config.ACCESS_TOKEN.payload({_id: userId}),
            config.SECRET_KEY,
            config.ACCESS_TOKEN.options
        )
    }

    generateRefreshToken(): string {
        return randomUUID()
    }

    async refreshToken({req, oldToken, user}: RefreshTokens) {
        try {
            const refreshedToken = await WEBFOLIO_API.Token.findOneAndDelete({value: oldToken}, {returnDocument: "before"})

            if (!refreshedToken) return null

            const generatedTokens = await this.createTokens({
                req,
                userId: user?._id
            })

            if (!generatedTokens) return null

            const {refreshToken, accessToken} = generatedTokens

            if (refreshToken) {
                await this.replaceTokenInUser({
                    user,
                    tokenId: refreshedToken?._id,
                    newTokenId: refreshToken?._id
                })
            }
            return {
                refreshToken: FieldsService.getTokenFields(refreshToken),
                accessToken
            }
        } catch (e) {
            console.log('REFRESH TOKEN SERVICE error', e)
        }
    }

    async createTokens({req, userId}: CreateTokens) {
        console.log('TOKEN SERVICE createTokens')
        try {
            const {remoteAddress} = req.socket
            const userAgent = req.headers['user-agent']

            const tokens = await WEBFOLIO_API.Token
                .find({user: userId})
                .sort({orderNumber: 1})

            if (tokens?.length >= 5) {
                await WEBFOLIO_API.Token.deleteOne(tokens[0]?._id)
            }

            const generatedTokens = this.generateTokens(userId)

            if (!generatedTokens) return null

            const {refreshToken, accessToken} = generatedTokens

            const newToken = await WEBFOLIO_API.Token.create({
                value: refreshToken,
                user: userId,
                ipAddress: remoteAddress,
                userAgent
            })

            return newToken ? {
                refreshToken: FieldsService.getTokenFields(newToken),
                accessToken
            } : null
        } catch (e) {
            console.log('tokenService createTokens error', e)
        }
    }

    async saveTokenInUser({user, tokenId}: SaveTokenInUser) {
        user.tokens.push(tokenId)
        await user.save()
    }

    async replaceTokenInUser({user, tokenId, newTokenId}: ReplaceTokenInUser) {
        const index = user.tokens.findIndex(id => id === tokenId)

        if (index >= 0) {
            user.tokens.splice(index, 0)
            user.tokens.push(newTokenId)
            await user.save()
        }
    }
}

export default new TokenService()