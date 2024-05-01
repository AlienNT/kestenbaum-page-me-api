import {errorResponse, successResponse} from "../helpers/responseHelper.js";

import {CustomRequest} from "../types.js";
import {Response} from "express";

import WEBFOLIO_API from "../models/index.js";

class ProfileController {
    async get(req: CustomRequest, res: Response) {
        try {
            const profile = await WEBFOLIO_API.Profile.findOne({})

            if (!profile) {
                return errorResponse(res, {
                    errors: ['get profile error']
                })
            }

            return successResponse(res, {
                data: profile
            })
        } catch (e) {
            console.log('ProfileController GET error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async create(req: CustomRequest, res: Response) {
        try {
            const profile = await WEBFOLIO_API.Profile.create({...req.body})

            if (!profile) {
                return errorResponse(res, {
                    errors: ['create profile error']
                })
            }
            return successResponse(res, {
                data: profile
            })
        } catch (e) {
            console.log('ProfileController CREATE error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }

    async update(req: CustomRequest, res: Response) {
        try {
            const profile = await WEBFOLIO_API.Profile.findOneAndUpdate({}, {...req.body}, {returnDocument: "after"})
            if (!profile) {
                return errorResponse(res, {
                    errors: ['update profile error']
                })
            }
            return successResponse(res, {
                data: profile
            })
        } catch (e) {
            console.log('ProfileController UPDATE error', e)
            return errorResponse(res, {
                errors: e
            })
        }
    }
}

export default new ProfileController()