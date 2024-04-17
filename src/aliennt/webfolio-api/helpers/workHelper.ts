import {CustomRequest} from "../types.js";

export function getWorkFields(req: CustomRequest) {
    const {en, ru, ua, image, path, codePath} = req?.body

    return {en, ru, ua, image, path, codePath}
}