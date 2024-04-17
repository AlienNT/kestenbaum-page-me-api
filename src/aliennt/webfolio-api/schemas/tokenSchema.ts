import {Schema} from "mongoose";
import {TokenSchema} from "../models/types.js";

const tokenSchema = new Schema<TokenSchema>({
    value: {
        type: Schema.Types.String,
        unique: true,
    },
    ipAddress: {
        type: Schema.Types.String,
    },
    userAgent: {
        type: Schema.Types.String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
})

tokenSchema.index({createdAt: 1}, {expireAfterSeconds: 60 * 60 * 24})

export default tokenSchema