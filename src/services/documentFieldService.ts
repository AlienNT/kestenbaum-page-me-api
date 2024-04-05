import {CustomRequest} from "../types/index.js";
import {
    RequestAuthFields,
    RequestCategoryFields,
    RequestSkillFields,
    RequestTitleFields,
    RequestWorkFields
} from "../types/services/documentFieldServiceInterfaces.js";
class DocumentFieldService {
    requestAuthFields(req: CustomRequest): RequestAuthFields | null {
        return this.#getFields<RequestAuthFields>(req?.body, 'login', 'password')
    }

    requestSkillFields(req: CustomRequest): RequestSkillFields | null {
        return this.#getFields<RequestSkillFields>(req?.body, 'title', 'img')
    }

    requestWorkFields(req: CustomRequest): RequestWorkFields | null {
        return this.#getFields<RequestWorkFields>(req?.body, 'title', 'img', 'link', 'category')
    }

    requestContactFields(req: CustomRequest): RequestTitleFields | null {
        return this.#getFields<RequestTitleFields>(req?.body, 'title', 'value')
    }

    requestCategoryFields(req: CustomRequest): RequestCategoryFields | null {
        return this.#getFields<RequestCategoryFields>(req?.body, 'value')
    }

    #getFields<T>(body: CustomRequest['body'], ...fields: string[]): null | T{
        if (!fields?.length) return null

        const res: any = {}

        fields.forEach(field => {
            if (body.hasOwnProperty(field)) res[field] = body[field]
        })

        return !Object.keys(res)?.length ? null : res
    }
}


export default new DocumentFieldService()