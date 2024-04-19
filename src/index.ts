import express, {Express, Response, Request} from 'express'
import dotenv from 'dotenv'
import url from "url";
import cookieParser from "cookie-parser";

import tokensMiddleware from "./aliennt/webfolio-api/middlewares/tokensMiddleware.js";

import PAGE_ME_CONFIG from "./kesten/page-me-api/config/config.js";
import WEBFOLIO_CONFIG from "./aliennt/webfolio-api/config/index.js";

import PAGE_ME_ROUTER from "./kesten/page-me-api/index.js";
import WEBFOLIO_API_ROUTER from "./aliennt/webfolio-api/index.js";

import bodyParser from "body-parser";
import cors from "cors";
import config from "./config.js";

const __dirname: string = url.fileURLToPath(new URL('.', import.meta.url));
const filePath: string = __dirname + '../views'
dotenv.config()

const API: Express = express()
    .use(cookieParser())
    .use(bodyParser.json({limit: "10mb"}))
    .use(
        PAGE_ME_CONFIG.API_ROUTE,
        cors({
            origin: PAGE_ME_CONFIG.ORIGINS,
            credentials: true,
        }),
        PAGE_ME_ROUTER
    )
    .use(
        WEBFOLIO_CONFIG.API_ROUTE,
        cors({
            origin: WEBFOLIO_CONFIG.ORIGINS,
            credentials: true
        }),
        tokensMiddleware as any,
        WEBFOLIO_API_ROUTER
    )
    .use(express.static(filePath))

async function server() {
    try {
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

server().then(() => console.log('server start success'))