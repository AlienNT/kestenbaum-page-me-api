import Express from 'express'
import mongoose from "mongoose";

import routes from "./routes/index.js";
import config from "./config.js";
import bodyParser from "body-parser";

import cors from "cors";
import {errorResponse} from "./helpers/responseHelper.js";


let isConnect = false

const API = new Express()
    .use(checkConnection)
    .use(bodyParser.json())
    .use(cors())
    .use(config.API_ROUTE, routes)

async function server() {
    try {
        await mongoose.connect(config.DB)
            .then(() => isConnect = true)
            .catch(() => isConnect = false)

        API.listen(config.PORT, () => {
            console.log('server started in port: ', config.PORT)
        })

    } catch (e) {
        console.log('server start error', e)
    }
}

function checkConnection(req, res, next) {
    if (isConnect) {
        return next()
    }

    return errorResponse(res, {
        status: 500,
        errors: ['DB connect error']
    })
}

await server()