import {Router} from "express";

import _contactsRouter from "./_contactsRouter.js";
import _skillsRouter from "./_skillsRouter.js";
import _worksRouter from "./_worksRouter.js";
import _categoriesRouter from "./_categoriesRouter.js";
import _authRouter from "./_authRouter.js";

const router: Router = Router()
    .use(_authRouter)
    .use(_contactsRouter)
    .use(_skillsRouter)
    .use(_worksRouter)
    .use(_categoriesRouter)
export default router