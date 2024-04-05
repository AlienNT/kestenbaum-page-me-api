import {Schema} from "mongoose";
import {ISkill} from "../types/models.js";

const skillSchema = new Schema<ISkill>({
    title: {
        type: Schema.Types.String,
    },
    img: {
        type: Schema.Types.String,
        required: [true, 'skill image required']
    }
}, {
    timestamps: true
})

export default skillSchema