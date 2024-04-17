import {fieldName} from "../helpers/fieldName.js";
import {Request} from "express";
import {Id} from "../../../types.js";

interface TokenObject {
    _id: Id,
    value: string
}

interface UserPublicFields {
    _id: Id,
    email: string,
    updatedAt?: string,
    createdAt?: string
}

class FieldsService {
    userPublicFields(fields: UserPublicFields) {
        const {email, _id, updatedAt, createdAt} = fields
        return {email, _id, updatedAt, createdAt}
    }

    getTokenFields(tokenObject: TokenObject) {
        const {_id, value} = tokenObject
        return {_id, value}
    }

    getSkillFields(req: Request) {
        return this.getFields(fieldName.SKILL, req)
    }

    getWorkFields(req: Request) {
        return this.getFields(fieldName.WORK, req)
    }

    getFields(fieldsConfig: any, req: Request) {
        const result: any = {}
        Object.keys(fieldsConfig).forEach(key => {
            const fieldName = fieldsConfig[key]

            if (req.body.hasOwnProperty(fieldName)) {
                result[fieldName] = req.body?.[fieldName]
            }
        })

        return result
    }
}

export default new FieldsService()