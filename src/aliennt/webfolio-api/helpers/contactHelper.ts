import {CustomRequest} from "../types.js";

export function getContactFields(req:CustomRequest) {
    const {title, type, value} = req?.body

    return {title, type, value}
}