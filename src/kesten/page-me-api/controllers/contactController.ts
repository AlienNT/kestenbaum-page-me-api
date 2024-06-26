import {errorResponse, successResponse} from "../helpers/responseHelper.js";

import statusCode from "../helpers/statusCodeHelper.js";
import DocumentFieldService from "../services/documentFieldService.js";
import {PAGE_ME} from "../models/index.js";

import {Response} from "express";
import {CustomRequest} from "../types/index.js";

class ContactController {
    async gelAll(req: CustomRequest, res: Response) {
        try {
            const contacts = await PAGE_ME.Contact.find({})

            if (!contacts) {
                return errorResponse(res, {
                    errors: ['get contacts error']
                })
            }
            return successResponse(res, {
                data: contacts
            })
        } catch (e) {
            console.log('GET_ALL contact error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async gelOne(req: CustomRequest, res: Response) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect id']
                })
            }

            const contact = await PAGE_ME.Contact.findById(id)

            if (!contact) {
                return errorResponse(res, {
                    errors: `contact (id: ${id}) not found`
                })
            }
            return successResponse(res, {
                data: contact
            })
        } catch (e) {
            console.log('GET_ONE contact error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async create(req: CustomRequest, res: Response) {
        try {
            const contactFields = DocumentFieldService.requestContactFields(req)

            if (!contactFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect fields']
                })
            }

            const newContact = await PAGE_ME.Contact.create(contactFields)

            if (!newContact) {
                return errorResponse(res, {
                    errors: ['contact create error']
                })
            }

            return successResponse(res, {
                data: newContact
            })
        } catch (e) {
            console.log('CREATE contact error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async update(req: CustomRequest, res: Response) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect id']
                })
            }

            const contactFields = DocumentFieldService.requestContactFields(req)

            if (!contactFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect contact fields']
                })
            }

            const updatedContact = await PAGE_ME.Contact.findByIdAndUpdate(id, contactFields, {
                returnDocument: 'after'
            })

            if (!updatedContact) {
                return errorResponse(res, {
                    errors: [`contact (id: ${id}) not updated`]
                })
            }

            return successResponse(res, {
                data: updatedContact
            })
        } catch (e) {
            console.log('UPDATE contact error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async delete(req: CustomRequest, res: Response) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect id']
                })
            }

            const deletedContact = await PAGE_ME.Contact.findByIdAndDelete(id, {
                returnDocument: 'after'
            })

            if (!deletedContact) {
                return errorResponse(res, {
                    errors: ['contact not deleted']
                })
            }

            return successResponse(res, {
                data: deletedContact
            })
        } catch (e) {
            console.log('DELETE contact error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }
}

export default new ContactController()