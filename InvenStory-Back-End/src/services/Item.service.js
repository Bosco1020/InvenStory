import Item from "../models/Item.model.js";
    
export default class ItemService {    

    getAllItems = async () => {
        return await Item.find({});
    }

    getItem = async (id) => {
        return await Item.find({_id: id});
    }

    addItem = async (newItem) => {
        let tItem;
        try {
            tItem = new Item(newItem);
        }
        catch (e) {
            throw new Error("Invalid Item Object");
        }
        return await tItem.save();
    }
}