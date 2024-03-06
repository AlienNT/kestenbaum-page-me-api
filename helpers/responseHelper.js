import statusCode from "./statusCodeHelper.js";

export function errorResponse(response, {
    status = 500,
    errors = ['request error']
}) {
    return response.status(status).json({data: {errors}, status})
}

export function successResponse(response, {
    status = statusCode.OK,
    data
}) {
    return response.status(status).json({data, status})
}