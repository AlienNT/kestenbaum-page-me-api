import {errorResponse, successResponse} from "../helpers/responseHelper.js";
import {getContactFields} from "../helpers/contactHelper.js";

import statusCode from "../helpers/statusCodeHelper.js";
import WEBFOLIO_API from "../models/index.js";

import {CustomRequest} from "../types.js";
import {Response} from "express";

class ContactController {
    async get(req:CustomRequest, res: Response) {
        try {
            const contacts = await WEBFOLIO_API.Contact.find({})

            if (!contacts?.length) {
                return errorResponse(res, {
                    status: statusCode.NOT_FOUND,
                    errors: 'contacts not found'
                })
            }

            return successResponse(res, {data: contacts})

        } catch (e) {
            console.log('get contacts error', e)
            return errorResponse(res, {
                errors: 'get contacts error'
            })
        }
    }

    async create(req:CustomRequest, res: Response) {
        try {
            const fields = getContactFields(req)

            const newContact = await WEBFOLIO_API.Contact.create(fields)

            if (!newContact) {
                return errorResponse(res, {
                    errors: 'contact not created'
                })
            }

            return successResponse(res, {data: newContact})

        } catch (e) {
            console.log('create contact error')
            return errorResponse(res, {
                errors: 'create contact error'
            })
        }
    }

    async update(req:CustomRequest, res:Response) {
        try {
            const {_id} = req?.body
            const fields = getContactFields(req)

            const updatedContact = await WEBFOLIO_API.Contact.findByIdAndUpdate(_id, fields, {new: true})

            if (!updatedContact) {
                errorResponse(res, {
                    errors: 'contact not updated'
                })
            }

            return successResponse(res, {data: updatedContact})
        } catch (e) {
            console.log('contact update error', e)
            return errorResponse(res, {
                errors: 'error'
            })
        }
    }

    async delete(req:CustomRequest, res: Response) {
        try {
            const {_id} = req?.body

            const deletedContact = await WEBFOLIO_API.Contact.findByIdAndDelete(_id)

            if (!deletedContact) {
                return errorResponse(res, {
                    errors: 'contact not deleted'
                })
            }

            return successResponse(res, {data: deletedContact})
        } catch (e) {
            console.log('delete contact error', e)
            return errorResponse(res, {
                errors: 'error'
            })
        }
    }
}

export default new ContactController()