import {Schema} from "mongoose";

const workSchema = new Schema({
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