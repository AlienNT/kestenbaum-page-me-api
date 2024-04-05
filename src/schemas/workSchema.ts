import {Schema} from "mongoose";
import {IWork} from "../types/models.js";

const workSchema = new Schema<IWork>({
    title: {
        type: Schema.Types.String,
        required: [true, 'work title required']
    },
    img: {
        type: Schema.Types.String,
    },
    link: {
        type: Schema.Types.String,
        required: [true, 'work link required']
    },
    category: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
})

export default workSchema