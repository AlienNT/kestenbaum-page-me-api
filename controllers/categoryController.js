import {errorResponse, successResponse} from "../helpers/responseHelper.js";

import {Category} from "../models/index.js";
import DocumentFieldService from "../services/DocumentFieldService.js";
import statusCode from "../helpers/statusCodeHelper.js";

class CategoryController {
    async get(req, res) {
        try {
            const categories = await Category.find({})

            if (!categories) {
                return errorResponse(res, {
                    errors: ['get errors error']
                })
            }

            return successResponse(res, {
                data: categories
            })
        } catch (e) {
            console.log('GET category error', e)
            return errorResponse(res, {
                errors: ['ты мне метод сломал!', e]
            })
        }
    }

    async getWithWorks(req, res) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST, errors: [`incorrect id: ${id}`]
                })
            }
            const categoryWithWorks = await Category.findById(id).populate('Work')

            if (!categoryWithWorks) {
                return errorResponse(res, {
                    errors: ['get category error']
                })
            }

            return successResponse(res, {
                data: categoryWithWorks
            })
        } catch (e) {
            console.log('GET WITH WORKS category error', e)
            return errorResponse(res, {
                errors: ['что-то пошло не так', e]
            })
        }
    }

    async create(req, res) {
        try {
            const categoryFields = DocumentFieldService.requestCategoryFields(req)

            if (!categoryFields) {
                return errorResponse(res, {
                    status: statusCode.BAD_REQUEST, errors: ['incorrect category fields']
                })
            }

            const newCategory = await Category.create(categoryFields)

            if (!newCategory) {
                return errorResponse(res, {
                    errors: ['create category error']
                })
            }

            return successResponse(res, {
                data: newCategory
            })
        } catch (e) {
            console.log('CREATE category error', e)
            return errorResponse(res, {
                errors: ['что-то пошло не так', e]
            })
        }
    }

    async update(req, res) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    errors: [`incorrect category id: ${id}`]
                })
            }

            const categoryFields = DocumentFieldService.requestCategoryFields(req)

            const updatedCategory = await Category.findByIdAndUpdate(id, categoryFields, {
                returnDocument: 'after'
            })

            if (!updatedCategory) {
                return errorResponse(res, {
                    errors: ['update category error']
                })
            }

            return successResponse(res, {
                data: updatedCategory
            })
        } catch (e) {
            console.log('UPDATE category error', e)
            return errorResponse(res, {
                errors: ['что-то пошло не так', e]
            })
        }
    }

    async delete(req, res) {
        try {
            const {id} = req?.params

            if (!id) {
                return errorResponse(res, {
                    errors: [`incorrect category id: ${id}`]
                })
            }

            const deletedCategory = await Category.findByIdAndDelete(id)

            if (!deletedCategory) {
                return errorResponse(res, {
                    errors: ['delete category error']
                })
            }

            return successResponse(res, {
                data: deletedCategory
            })
        } catch (e) {
            console.log('DELETE category error', e)
            return errorResponse(res, {
                errors: ['что-то пошло не так', e]
            })
        }
    }
}

export default new CategoryController()