import {Schema} from "mongoose";
import {IToken} from "../types/models.js";

const tokenSchema = new Schema<IToken>({
    remoteAddress: {
        type: Schema.Types.String,
        default: null
    },
    userAgent: {
        type: Schema.Types.String,
        default: null
    },
    tokenValue: {
        type: Schema.Types.String,
        required: [true, 'token value required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})
export default tokenSchema