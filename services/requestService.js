class RequestService {
    getIP(req) {
        return req.connection?.remoteAddress
    }

    getUserAgent(req) {
        return req.connection?.userAgent || req.headers['user-agent']
    }
}

export default new RequestService()