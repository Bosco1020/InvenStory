import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    assignedItems: { type: Array, required: false }
});

const Item = model("Item", itemSchema);

export default Item;