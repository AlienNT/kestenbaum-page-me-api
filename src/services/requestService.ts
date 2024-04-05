import {CustomRequest} from "../types/index.js";

class RequestService {
    getIP(req: CustomRequest): string | undefined {
        return req.socket?.remoteAddress
    }

    getUserAgent(req: CustomRequest): string | undefined {
        return req.headers['user-agent']
    }
}

export default new RequestService()