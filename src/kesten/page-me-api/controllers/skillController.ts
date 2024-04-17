import {errorResponse, successResponse} from "../helpers/responseHelper.js";

import statusCode from "../helpers/statusCodeHelper.js";
import DocumentFieldService from "../services/documentFieldService.js";

import {CustomRequest} from "../types/index.js";
import {Response} from "express";
import {PAGE_ME} from "../models/index.js";

class SkillController {
    async gelAll(req: CustomRequest, res: Response) {
        try {
            const skills = await PAGE_ME.Skill.find({})

            if (!skills) {
                return errorResponse(res, {
                    status: statusCode.NOT_FOUND,
                    errors: ['skills not found']
                })
            }

            return successResponse(res, {
                data: skills
            })
        } catch (e) {
            console.log('GET skills error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async gelOne(req: CustomRequest, res: Response) {
        try {
            const {id} = req.params

            const skill = await PAGE_ME.Skill.findById(id)

            if (!skill) {
                return errorResponse(res, {
                    status: statusCode.NOT_FOUND,
                    errors: [`skill with id ${id} not found`]
                })
            }

            return successResponse(res, {
                data: skill
            })
        } catch (e) {
            console.log('GET skill error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async create(req: CustomRequest, res: Response) {
        try {
            const skillFields = DocumentFieldService.requestSkillFields(req)

            if (!skillFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect skill fields']
                })
            }

            const newSkill = await PAGE_ME.Skill.create(skillFields)

            if (!newSkill) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['skill not created']
                })
            }
            return successResponse(res, {
                data: newSkill
            })
        } catch (e) {
            console.log('CREATE skill error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async update(req: CustomRequest, res: Response) {
        try {
            const {id} = req?.params
            const skillFields = DocumentFieldService.requestSkillFields(req)

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect id']
                })
            }
            if (!skillFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST,
                    errors: ['incorrect skill fields']
                })
            }

            const updatedSkill = await PAGE_ME.Skill.findByIdAndUpdate(id, skillFields, {
                returnDocument: "after"
            })

            if (!updatedSkill) {
                return errorResponse(res, {
                    errors: [`skill (id: ${id}) not updated`]
                })
            }

            return successResponse(res, {
                data: updatedSkill
            })
        } catch (e) {
            console.log('UPDATE skill error', e)
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

            const deletedSkill = await PAGE_ME.Skill.findByIdAndDelete(id, {
                returnDocument: 'after'
            })

            if (!deletedSkill) {
                return errorResponse(res, {
                    errors: [`skill (id: ${id}) not deleted`]
                })
            }

            return successResponse(res, {
                data: deletedSkill
            })
        } catch (e) {
            console.log('DELETE skill error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }
}

export default new SkillController()