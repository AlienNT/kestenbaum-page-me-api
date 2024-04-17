import {Request} from "express";
import {UserDocument} from "./models/types.js";
import {Id} from "../../types.js";

export interface CustomRequest extends Request {
    accessToken?: string,
    refreshToken?: string,
    savedToken?: string,
    isAdmin?: boolean,
    user?: UserDocument,
    userId?: Id
}