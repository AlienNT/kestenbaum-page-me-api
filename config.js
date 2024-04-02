import dayjs from 'dayjs'
export default {
    DB: process.env.DB_URL,
    PORT: process.env.PORT || 5000,
    API_ROUTE: process.env.API_ROUTE || '/api',
    SECRET: process.env.SECRET_KEY,
    REFRESH_TOKEN_EXPIRES: dayjs().add(30, 'd').toDate(),
    IS_COOKIE_SECURE: process.env.NODE_ENV !== "development",
    ORIGINS: [
        "http://localhost:5173",
        "https://admin-panel-rho-six.vercel.app"
    ]
}