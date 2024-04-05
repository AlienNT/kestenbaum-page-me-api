import {randomUUID} from "node:crypto"
import jwt from "jsonwebtoken";

import config from "../config.js";
import RequestService from "./requestService.js";
import {Token} from "../models/index.js";

import {CustomRequest, Id, Uuid, TokenType} from "../types/index.js";
import {GenerateTokens} from "../types/services/tokenServiceInterfaces.js";
import {TokenDocument} from "../types/documents.js";

class TokenService {
    async verify(token: TokenType): Promise<jwt.JwtPayload | null | string> {
        if (!config.SECRET) return null

        return jwt.verify(token, config.SECRET);
    }

    async getToken(req: CustomRequest): Promise<TokenType | null> {
        return req?.cookies?.token || null
    }

    async generateTokens(_id: Id): Promise<GenerateTokens> {
        return {
            refreshToken: await this.generateRefreshToken(),
            accessToken: await this.generateAccessToken(_id)
        }
    }

    async generateRefreshToken(): Promise<Uuid> {
        return randomUUID()
    }

    async generateAccessToken(_id: Id): Promise<TokenType | null> {
        if (!config.SECRET) return null

        return jwt.sign({_id}, config.SECRET, {expiresIn: process.env.PROD ? '10m' : '1d'})
    }

    async createAndSave(req: CustomRequest, userId: Id): Promise<TokenDocument | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const tokens = await Token.find({
                    user: userId
                })

                if (tokens) {
                    await Token.deleteMany({user: userId})
                }
                const token = await Token.create({
                    remoteAddress: RequestService.getIP(req),
                    userAgent: RequestService.getUserAgent(req),
                    tokenValue: await this.generateRefreshToken(),
                    user: userId
                })

                return !token ? reject(null) : resolve(token)

            } catch (e) {
                console.log('save token error', e)
                return reject(e)
            }
        })
    }
}

export default new TokenService()