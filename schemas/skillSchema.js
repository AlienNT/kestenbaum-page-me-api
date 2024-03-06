import {Schema} from "mongoose";

const skillSchema = new Schema({
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