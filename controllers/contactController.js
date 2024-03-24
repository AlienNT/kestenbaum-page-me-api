import {errorResponse, successResponse} from "../helpers/responseHelper.js";
import {Contact} from "../models/index.js";
import statusCode from "../helpers/statusCodeHelper.js";
import DocumentFieldService from "../services/documentFieldService.js";

class ContactController {
    async gelAll(req, res) {
        try {
            const contacts = await Contact.find({})

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

    async gelOne(req, res) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect id']
                })
            }

            const contact = await Contact.findById(id)

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

    async create(req, res) {
        try {
            const contactFields = DocumentFieldService.requestContactFields(req)

            if (!contactFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect fields']
                })
            }

            const newContact = await Contact.create(contactFields)

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

    async update(req, res) {
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

            const updatedContact = await Contact.findByIdAndUpdate(id, contactFields, {
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

    async delete(req, res) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect id']
                })
            }

            const deletedContact = await Contact.findByIdAndDelete(id, {
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