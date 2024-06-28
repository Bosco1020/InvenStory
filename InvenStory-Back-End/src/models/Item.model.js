import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tagList: { type: Array, required: true }
});

const Item = model("Item", itemSchema);

export default Item;