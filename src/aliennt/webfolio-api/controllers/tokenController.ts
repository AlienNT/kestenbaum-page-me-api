import WEBFOLIO_API from "../models/index.js";

class TokenController {
    async get(token: string) {
        try {
            return await WEBFOLIO_API.Token.findOne({value: token})
        } catch (e) {
            console.log('TokenController GET error', e)
            return null
        }
    }
}

export default new TokenController()