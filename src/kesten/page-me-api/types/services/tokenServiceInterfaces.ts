import {AccessToken, RefreshToken} from "../index.js";

export interface GenerateTokens {
    refreshToken: RefreshToken,
    accessToken: AccessToken
}