import {Schema} from "mongoose";

const contactSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: [true, 'contact title is required']
    },
    value: {
        type: Schema.Types.String,
        required: [true, 'contact value is required']
    }
}, {
    timestamps: true
})

export default contactSchema