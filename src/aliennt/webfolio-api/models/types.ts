import {Document, Model} from "mongoose";
import {Id} from "../../../types.js";

export interface UserSchema {
    email: string,
    password: string,
    tokens: Id[]
}

export interface TokenSchema {
    value: string,
    ipAddress: string,
    userAgent: string,
    user: Id,
}

export interface SkillSchema {
    title: string,
    active?: boolean,
    image?: string,
}

export interface ContactSchema {
    title?: string
    type?: string
    value: string
}

export interface WorkTranslateSchema {
    title: string,
    description?: string
}

export interface WorkSchema {
    en: WorkTranslateSchema,
    ru: WorkTranslateSchema,
    ua: WorkTranslateSchema,
    image?: string,
    path: string,
    codePath: string,
    chips?: string,
}

export interface ProfileLocale {
    firstName: string,
    lastName?: string,
    greeting: string
}

export interface ProfileSchema {
    en: ProfileLocale,
    ru: ProfileLocale,
    ua: ProfileLocale,
    image?: string
}

export type ProfileModel = Model<ProfileSchema>
export type UserModel = Model<UserSchema>
export type TokenModel = Model<TokenSchema>
export type SkillModel = Model<SkillSchema>
export type ContactModel = Model<ContactSchema>
export type WorkModel = Model<WorkSchema>

export type UserDocument = Document<unknown, {}, UserSchema> & UserSchema & { _id: Id }