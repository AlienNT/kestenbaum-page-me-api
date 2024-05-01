import {createConnection} from "mongoose";

import {profileSchema} from "../schemas/profileSchema.js";
import {userSchema} from "../schemas/userSchema.js";
import tokenSchema from "../schemas/tokenSchema.js";
import {skillSchema} from "../schemas/skillSchema.js";
import {workSchema} from "../schemas/workSchema.js";
import {contactSchema} from "../schemas/contactSchema.js";

import {
    ContactModel,
    ContactSchema,
    SkillModel,
    SkillSchema,
    TokenModel,
    TokenSchema,
    UserModel,
    UserSchema,
    WorkSchema,
    WorkModel,
    ProfileSchema,
    ProfileModel
} from "./types.js";

import {DB_NAMES} from "../../../databases/dbNames.js";

const connection = await createConnection(DB_NAMES.ALIEN_WEBFOLIO.url)
    .asPromise()
    .then(res => {
        console.log(DB_NAMES.ALIEN_WEBFOLIO.name + ' connected')
        return res
    })

const WEBFOLIO_API = {
    Profile: connection.model<ProfileSchema, ProfileModel>('Profile', profileSchema),
    User: connection.model<UserSchema, UserModel>('User', userSchema),
    Token: connection.model<TokenSchema, TokenModel>('Token', tokenSchema),
    Skill: connection.model<SkillSchema, SkillModel>('Skill', skillSchema),
    Work: connection.model<WorkSchema, WorkModel>('Work', workSchema),
    Contact: connection.model<ContactSchema, ContactModel>('Contact', contactSchema),
}

export default WEBFOLIO_API