import {Request} from "express";

export type RefreshToken = string
export type AccessToken = string | null
export type Uuid = string
export type TokenType = string
export type Password = string

export interface CustomRequest extends Request {
    user?: string,
    token?: string
}