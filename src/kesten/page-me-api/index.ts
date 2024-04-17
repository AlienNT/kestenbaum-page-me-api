import {Router} from "express";

import _contactsRouter from "./routes/_contactsRouter.js";
import _skillsRouter from "./routes/_skillsRouter.js";
import _worksRouter from "./routes/_worksRouter.js";
import _categoriesRouter from "./routes/_categoriesRouter.js";
import _authRouter from "./routes/_authRouter.js";

const PAGE_ME_ROUTER: Router = Router()
    .use(_authRouter)
    .use(_contactsRouter)
    .use(_skillsRouter)
    .use(_worksRouter)
    .use(_categoriesRouter)
export default PAGE_ME_ROUTER