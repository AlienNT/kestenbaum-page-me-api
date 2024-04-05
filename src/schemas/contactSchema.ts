import {Schema} from "mongoose";
import {IContact} from "../types/models.js";

const contactSchema = new Schema<IContact>({
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