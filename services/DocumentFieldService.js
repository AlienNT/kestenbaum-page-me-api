class DocumentFieldService {
    requestSkillFields(req) {
        return this.#getFields(req?.body, 'title', 'img')
    }

    requestWorkFields(req) {
        return this.#getFields(req?.body, 'title', 'img', 'link', 'category')
    }

    requestContactFields(req) {
        return this.#getFields(req?.body, 'title', 'value')
    }

    requestCategoryFields(req) {
        return this.#getFields(req?.body, 'value')
    }

    #getFields(body, ...fields) {
        if (!fields?.length) return null

        const res = {}

        fields.forEach(field => {
            if (body.hasOwnProperty(field)) res[field] = body[field]
        })

        return !Object.keys(res)?.length ? null : res
    }
}


export default new DocumentFieldService()