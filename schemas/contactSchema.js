import {Schema} from "mongoose";

const contactSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: [true, 'contact title required']
    },
    value: {
        type: Schema.Types.String,
        required: [true, 'contact value required']
    }
}, {
    timestamps: true
})

export default contactSchema