import { text } from "body-parser";
import { required } from "joi";
import { IPost } from "modules/models/data.model";
import { Schema, Types, model } from "mongoose";


export const DataSchema: Schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user'},
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
});

export default model<IPost>('Post', DataSchema);