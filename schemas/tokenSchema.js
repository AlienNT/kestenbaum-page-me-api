import {Schema} from "mongoose";

const tokenSchema = new Schema({
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