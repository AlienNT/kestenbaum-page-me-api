import {Skill} from "../models/index.js";
import {errorResponse, successResponse} from "../helpers/responseHelper.js";
import statusCode from "../helpers/statusCodeHelper.js";

class SkillController {
    async gelAll(req, res) {
        try {
            const skills = await Skill.find({})

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
                errors: [e]
            })
        }
    }

    async gelOne(req, res) {
        try {
            const {id} = req.params

            const skill = await Skill.findById(id)

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
                errors: [e]
            })
        }
    }

    async create(req, res) {
        try {
        } catch (e) {
        }
    }

    async update(req, res) {
        try {
        } catch (e) {
        }
    }

    async delete(req, res) {
        try {
        } catch (e) {
        }
    }
}

export default new SkillController()