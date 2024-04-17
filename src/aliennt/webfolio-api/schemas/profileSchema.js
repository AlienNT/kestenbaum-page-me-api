import {Schema} from "mongoose";

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
export const profileSchema = new Schema({
    firstName: {
        en: firstName,
        ru: firstName,
        ua: firstName
    },
    lastName: {
        en: lastName,
        ru: lastName,
        ua: lastName
    },
    image: {
        type: Schema.Types.String
    },
    dateOfBirth: {
        type: Schema.Types.Date,
        default: null
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})
