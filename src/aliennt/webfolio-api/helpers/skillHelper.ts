import {CustomRequest} from "../types.js";

export function getSkillFields(req: CustomRequest) {
    const {title, active, image} = req?.body

    return {title, active, image}
}