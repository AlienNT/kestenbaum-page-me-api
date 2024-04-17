import {Router} from "express";

import _authRouter from "./routes/_authRouter.js";
import _skillRouter from "./routes/_skillRouter.js";
import _workRouter from "./routes/_workRouter.js";
import _contactRouter from "./routes/_contactRouter.js";


const WEBFOLIO_API_ROUTER = Router()
    .use(_authRouter)
    .use(_skillRouter)
    .use(_workRouter)
    .use(_contactRouter)
export default WEBFOLIO_API_ROUTER