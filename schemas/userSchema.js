import {Schema} from "mongoose";

const userSchema = new Schema({
    login: {
        type: Schema.Types.String,
        required: [true, 'login required']
    },
    email: {
        type: Schema.Types.String,
        required: false,
        default: null
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'password required']
    },
    name: {
        type: Schema.Types.String,
        required: false,
        default: null
    },
    image: {
        type: Schema.Types.String,
        required: false,
        default: null
    },
    token: {
        type: Schema.Types.ObjectId,
        ref: 'Token'
    }
}, {
    timestamps: true
})

export default userSchema