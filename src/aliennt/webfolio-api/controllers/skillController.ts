import {errorResponse, successResponse} from "../helpers/responseHelper.js";

import FieldsService from "../services/fieldsService.js";
import statusCode from "../helpers/statusCodeHelper.js";
import WEBFOLIO_API from "../models/index.js";

import {CustomRequest} from "../types.js";
import {Response} from "express";

class SkillController {
    async get(req:CustomRequest, res: Response) {
        try {
            const {isAdmin} = req
            const skills = await WEBFOLIO_API.Skill.find(isAdmin ? {} : {active: true}).lean()

            if (!skills) {
                return errorResponse(res, {
                    status: 404,
                    errors: 'skills not found'
                })
            }

            return successResponse(res, {data: skills})
        } catch (e) {
            console.log('skillController GET error', e)
            return errorResponse(res, {
                errors: 'get skills error'
            })
        }
    }

    async create(req:CustomRequest, res: Response) {
        try {
            const skillFields = FieldsService.getSkillFields(req)

            const newSkill = await WEBFOLIO_API.Skill.create(skillFields)

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
            console.log('skillController CREATE error', e)
            return errorResponse(res, {
                errors: ['skill create error']
            })
        }
    }

    async update(req:CustomRequest, res: Response) {
        try {
            const {id} = req?.params
            const skillFields = FieldsService.getSkillFields(req)

            const updatedSkill = await WEBFOLIO_API.Skill.findByIdAndUpdate(id, skillFields, {new: true})

            if (!updatedSkill) {
                return errorResponse(res, {
                    errors: [`skill ${id} not updated`]
                })
            }

            return successResponse(res, {
                data: updatedSkill
            })
        } catch (e) {
            console.log('skillController UPDATE error', e)
            return errorResponse(res, {
                errors: ['skill update error']
            })
        }
    }

    async delete(req:CustomRequest, res: Response) {
        try {
            const {id} = req?.params

            const deletedSkill = await WEBFOLIO_API.Skill.findByIdAndDelete(id)

            if (!deletedSkill) {
                return errorResponse(res, {
                    errors: [`skill ${id} not deleted`]
                })
            }

            return successResponse(res, {
                data: deletedSkill
            })
        } catch (e) {
            console.log('skillController DELETE error', e)
            return errorResponse(res, {
                errors: ['delete skill error']
            })
        }
    }
}

export default new SkillController()