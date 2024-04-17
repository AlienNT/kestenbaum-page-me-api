import {Model} from "mongoose";
import {Id} from "../../../types.js";

export interface ISkill {
    title?: string,
    img: string
}

export interface IContact {
    title: string,
    value: string
}

export interface IWork {
    title: string,
    img?: string,
    link: string,
    category?: string,
}

export interface ICategory {
    value: string
    works: string
}

export interface IUser {
    login: string,
    email?: string,
    password: string,
    name?: string,
    image?: string,
    token?: Id,
}

export interface IToken {
    remoteAddress?: string,
    userAgent?: string,
    tokenValue: string,
    user?: string,
}
export type UserModel = Model<IUser>
export type TokenModel = Model<IToken>
export type ContactModel = Model<IContact>
export type SkillModel = Model<ISkill>
export type WorkModel = Model<IWork>
export type CategoryModel = Model<ICategory>