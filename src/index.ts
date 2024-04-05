import express, {Express, Response, Request, NextFunction} from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'

import routes from "./routes/index.js";
import config from "./config.js";

import url from "url";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import {errorResponse} from "./helpers/responseHelper.js";

let isConnect: boolean = false
const __dirname: string = url.fileURLToPath(new URL('.', import.meta.url));
const filePath: string = __dirname + '../views'
dotenv.config()

const API: Express = express()
    .use(checkConnection)
    .use(cookieParser())
    .use(bodyParser.json({limit: "10mb"}))
    .use(cors({
        origin: config.ORIGINS,
        credentials: true,
    }))
    .use(config.API_ROUTE, routes)
    .use(express.static(filePath))

async function server() {
    try {
        const DB_URL = config.DB

        if (!DB_URL) return

        await mongoose.connect(DB_URL)
            .then(() => isConnect = true)
            .catch(() => isConnect = false)

        API.listen(config.PORT, () => {
            console.log('server started in port: ', config.PORT)
        })
        API.get('/', (req: Request, res: Response) => {
            res.sendFile(filePath + '/index.html')
        })

    } catch (e) {
        console.log('server start error', e)
    }
}

function checkConnection(req: Request, res: Response, next: NextFunction) {
    if (isConnect) {
        return next()
    }

    return errorResponse(res, {
        status: 500,
        errors: ['DB connect error']
    })
}

server().then(() => console.log('server start success'))