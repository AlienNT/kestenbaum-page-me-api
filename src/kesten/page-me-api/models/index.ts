import {createConnection} from "mongoose";

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

import {DB_NAMES} from "../../../databases/dbNames.js";

export const connection = await createConnection(DB_NAMES.KESTEN_PAGE_ME.url)
    .asPromise()
    .then(res => {
        console.log(DB_NAMES.KESTEN_PAGE_ME.name + ' connected')
        return res
    })
export const PAGE_ME = {
    Contact: connection.model<IContact, ContactModel>('Contact', contactSchema),
    Skill: connection.model<ISkill, SkillModel>('Skill', skillSchema),
    Work: connection.model<IWork, WorkModel>('Work', workSchema),
    Category: connection.model<ICategory, CategoryModel>('Category', categorySchema),
    User: connection.model<IUser, UserModel>('User', userSchema),
    Token: connection.model<IToken, TokenModel>('Token', tokenSchema)
}