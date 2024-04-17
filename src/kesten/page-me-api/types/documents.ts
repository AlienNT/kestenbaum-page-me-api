import {Document} from "mongoose";
import {IToken} from "./models.js";
import {Id} from "./index.js";

export type TokenDocument = Document<unknown, {}, IToken> & IToken & { _id: Id; }