import {Schema} from "mongoose";
import {ProfileSchema} from "../models/types.js";

const firstName = {
    type: Schema.Types.String,
    required: [true, 'name is required'],
    minLength: 2,
    maxLength: 20
}

const lastName = {
    type: Schema.Types.String,
    minLength: 2,
    maxLength: 20
}

const greeting = {
    type: Schema.Types.String,
    required: [true, 'greeting is required']
}

const ProfileLocaleSchema = {
    firstName,
    lastName,
    greeting
}
export const profileSchema = new Schema<ProfileSchema>({
    en: ProfileLocaleSchema,
    ru: ProfileLocaleSchema,
    ua: ProfileLocaleSchema,
    image: {
        type: Schema.Types.String,
        required: false,
        default: null
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})
