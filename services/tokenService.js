import {randomUUID} from "node:crypto"
import jwt from "jsonwebtoken";
import config from "../config.js";
import RequestService from "./requestService.js";
import {Token} from "../models/index.js";

class TokenService {
    async create() {
        try {

        } catch (e) {

        }
    }

    async refresh() {

    }

    async verify(token) {
        return jwt.verify(token, config.SECRET);
    }

    async getToken(req) {
        //для токена доступа
       /* const authorizationHeader = req.headers.authorization
        return authorizationHeader ? authorizationHeader.split(' ')[1] : null*/

        return req?.cookies?.token || null
    }


    async generateTokens(_id) {
        return {
            refreshToken: this.generateRefreshToken(),
            accessToken: this.generateAccessToken(_id)
        }
    }

    async generateRefreshToken() {
        return randomUUID()
    }

    async generateAccessToken(_id) {
        return jwt.sign({_id}, config.SECRET, {expiresIn: process.env.PROD ? '10m' : '1d'})
    }

    async createAndSave(req, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const tokens = await Token.find({
                    user:userId
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