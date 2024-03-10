import {Schema} from "mongoose";

const categorySchema = new Schema({
    value: {
        type: Schema.Types.String,
        required: [true, 'category name required'],
        unique: [true, 'category name must be unique']
    },
    works: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Work'
        }
    ]
}, {
    timestamps: true
})

export default categorySchema