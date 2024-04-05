import {Schema} from "mongoose";
import {ICategory} from "../types/models.js";

const categorySchema = new Schema<ICategory>({
    value: {
        type: Schema.Types.String,
        required: [true, 'category name required'],
        unique: true
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