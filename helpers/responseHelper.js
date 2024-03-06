export function errorResponse(response, {
    status = 500,
    errors = ['request error']
}) {
    return response.status(status).json({data: {errors}, status})
}

export function successResponse(response, {
    status = 200,
    data = ''
}) {
    return response.status(status).json({data, status})
}