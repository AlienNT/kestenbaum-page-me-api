import {Schema, SchemaDefinitionType} from "mongoose";
import {WorkSchema} from "../models/types.js";

const workTitle: SchemaDefinitionType<any> = {
    type: Schema.Types.String,
    required: [true, 'work title is required'],
    minLength: 2,
    maxLength: 60
}
const workDescription = {
    type: Schema.Types.String,
    required: false,
    minLength: 2,
    maxLength: 200
}

const workTranslateSchema = new Schema({
    title: workTitle,
    description: workDescription,
})

export const workSchema = new Schema<WorkSchema>({
    en: workTranslateSchema,
    ru: workTranslateSchema,
    ua: workTranslateSchema,
    image: {
        type: Schema.Types.String
    },
    path: {
        type: Schema.Types.String,
        required: [true, 'path is required']
    },
    codePath: {
        type: Schema.Types.String,
        required: [true, 'code path is required']
    },
    chips: {
        type: Schema.Types.String
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})