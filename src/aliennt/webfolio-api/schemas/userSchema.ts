import {Schema} from "mongoose";
import {UserSchema} from "../models/types.js";

export const userSchema = new Schema<UserSchema>({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    tokens: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Token'
        }
    ]
}, {
    timestamps: true
})