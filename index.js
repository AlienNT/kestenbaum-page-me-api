import Express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'

import routes from "./routes/index.js";
import config from "./config.js";
import bodyParser from "body-parser";

import cors from "cors";
import {errorResponse} from "./helpers/responseHelper.js";
import url from "url";

let isConnect = false
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const filePath = __dirname + './views'
dotenv.config()

const API = new Express()
    .use(checkConnection)
    .use(bodyParser.json({limit: "10mb"}))
    .use(cors())
    .use(config.API_ROUTE, routes)
    .use(Express.static(filePath))

async function server() {
    try {
        await mongoose.connect(config.DB)
            .then(() => isConnect = true)
            .catch(() => isConnect = false)

        API.listen(config.PORT, () => {
            console.log('server started in port: ', config.PORT)
        })
        API.get('/', (req, res) => {
            res.sendFile(filePath + '/index.html')
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