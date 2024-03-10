import {model} from "mongoose";

import contactSchema from "../schemas/contactSchema.js";
import skillSchema from "../schemas/skillSchema.js";
import workSchema from "../schemas/workSchema.js";
import categorySchema from "../schemas/categorySchema.js";

export const Contact = model('Contact', contactSchema)
export const Skill = model('Skill', skillSchema)
export const Work = model('Work', workSchema)
export const Category = model('Category', categorySchema)