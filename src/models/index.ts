import {model} from "mongoose";

import {
    CategoryModel,
    ContactModel,
    ICategory,
    IContact,
    ISkill,
    IToken,
    IUser,
    IWork,
    SkillModel, TokenModel, UserModel,
    WorkModel
} from "../types/models.js";

import contactSchema from "../schemas/contactSchema.js";
import skillSchema from "../schemas/skillSchema.js";
import workSchema from "../schemas/workSchema.js";
import categorySchema from "../schemas/categorySchema.js";
import userSchema from "../schemas/userSchema.js";
import tokenSchema from "../schemas/tokenSchema.js";

export const Contact = model<IContact, ContactModel>('Contact', contactSchema)
export const Skill = model<ISkill, SkillModel>('Skill', skillSchema)
export const Work = model<IWork, WorkModel>('Work', workSchema)
export const Category = model<ICategory, CategoryModel>('Category', categorySchema)
export const User = model<IUser, UserModel>('User', userSchema)
export const Token = model<IToken, TokenModel>('Token', tokenSchema)