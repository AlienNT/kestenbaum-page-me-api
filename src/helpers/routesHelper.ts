export const routeNames = {
    CONTACTS: {
        GET_ONE: '/contacts/:id',
        GET_ALL: '/contacts',
        CREATE: '/contacts',
        UPDATE: '/contacts/:id',
        DELETE: '/contacts/:id',
    },
    SKILLS: {
        GET_ONE: '/skills/:id',
        GET_ALL: '/skills',
        CREATE: '/skills',
        UPDATE: '/skills/:id',
        DELETE: '/skills/:id',
    },
    WORKS: {
        GET_ONE: '/works/:id',
        GET_ALL: '/works',
        CREATE: '/works',
        UPDATE: '/works/:id',
        DELETE: '/works/:id',
    },
    CATEGORIES: {
        GET_WITH_WORKS: '/categories/:id',
        GET_ALL: '/categories',
        CREATE: '/categories',
        UPDATE: '/categories/:id',
        DELETE: '/categories/:id',
    },
    AUTH: {
        LOGIN: '/login',
        LOGOUT: '/logout',
        REGISTRATION: '/registration',
    }
}