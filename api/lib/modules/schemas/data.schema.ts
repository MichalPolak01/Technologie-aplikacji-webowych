import { IPost } from "modules/models/data.model";
import { Schema, model } from "mongoose";


export const DataSchema: Schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true},
});

export default model<IPost>('Post-MP9', DataSchema);