import { Schema } from "mongoose";

export interface IToken {
    _id: string;
    userId: Schema.Types.ObjectId;
    createDate: Number;
    type: string;
    value: string;
}