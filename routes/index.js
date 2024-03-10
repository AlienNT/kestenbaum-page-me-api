import {Router} from "express";

import _contactsRouter from "./_contactsRouter.js";
import _skillsRouter from "./_skillsRouter.js";
import _worksRouter from "./_worksRouter.js";
import _categoriesRouter from "./_categoriesRouter.js";

const router = new Router()

.use(_contactsRouter)
.use(_skillsRouter)
.use(_worksRouter)
.use(_categoriesRouter)
export default router