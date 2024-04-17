import * as process from "process";

export const DB_NAMES = {
    KESTEN_PAGE_ME: {
        name: 'kestenbaum-page-me-api',
        url: process.env.KESTEN_PAGE_ME_DB_URL || ''
    },
    ALIEN_WEBFOLIO: {
        name: 'webfolio-api',
        url: process.env.ALIEN_WEBFOLIO_DB_URL || ''
    }
}