import {errorResponse, successResponse} from "../helpers/responseHelper.js";

import statusCode from "../helpers/statusCodeHelper.js";
import DocumentFieldService from "../services/documentFieldService.js";

import {CustomRequest} from "../types/index.js";
import {Response} from "express";
import {PAGE_ME} from "../models/index.js";

class WorkController {
    async getAll(req: CustomRequest, res: Response) {
        try {
            const works = await PAGE_ME.Work.find({})

            if (!works) {
                return errorResponse(res, {
                    errors: ['get works error']
                })
            }

            return successResponse(res, {
                data: works
            })
        } catch (e) {
            console.log('GET_ALL work error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async getOne(req: CustomRequest, res: Response) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect id']
                })
            }

            const contact = await PAGE_ME.Work.findById(id)

            if (!contact) {
                return errorResponse(res, {
                    errors: `work (id: ${id}) not found`
                })
            }

            return successResponse(res, {
                data: contact
            })
        } catch (e) {
            console.log('GET_ONE work error', e)
            return errorResponse(res, {
                errors: e
            })
        }

    }

    async create(req: CustomRequest, res: Response) {
        try {
            const workFields = DocumentFieldService.requestWorkFields(req)

            if (!workFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect fields']
                })
            }

            const newContact = await PAGE_ME.Work.create(workFields)

            if (!newContact) {
                return errorResponse(res, {
                    errors: ['work create error']
                })
            }

            return successResponse(res, {
                data: newContact
            })
        } catch (e) {
            console.log('CREATE work error', e)
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

            const workFields = DocumentFieldService.requestWorkFields(req)

            if (!workFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect contact fields']
                })
            }

            const updatedWork = await PAGE_ME.Work.findByIdAndUpdate(id, workFields, {
                returnDocument: 'after'
            })

            if (!updatedWork) {
                return errorResponse(res, {
                    errors: [`work (id: ${id}) not updated`]
                })
            }

            return successResponse(res, {
                data: updatedWork
            })
        } catch (e) {
            console.log('UPDATE work error', e)
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

            const deletedWork = await PAGE_ME.Work.findByIdAndDelete(id, {
                returnDocument: 'after'
            })

            if (!deletedWork) {
                return errorResponse(res, {
                    errors: ['work not deleted']
                })
            }

            return successResponse(res, {
                data: deletedWork
            })
        } catch (e) {
            console.log('DELETE work error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }
}

export default new WorkController()