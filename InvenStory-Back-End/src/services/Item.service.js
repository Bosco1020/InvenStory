import Item from "../models/Item.model.js";
    
export default class ItemService {    

    getAllItems = async () => {
        return await Item.find({});
    }

    getItem = async (id) => {
        return await Item.find({_id: id});
    }

    getUserItems = async (user) => {
        let items = [];

        for (let i = 0; i < user.assignedItems.length; i++){
            const temp = await Item.find({ name: user.assignedItems[i] });
            items[i] = temp[0];
        }

        return items;
    }

    addItem = async (newItem) => {
        let tItem;
        try {
            tItem = new Item(newItem);
        }
        catch (e) {
            throw new Error("Item validation failed");
        }
        return await tItem.save();
    }

    updateItem = async (newItem) => {
        let tItem;
        try {
            tItem = new Item(newItem);
        }
        catch (e) {
            throw new Error("Item validation failed");
        }
        return await Item.findOneAndUpdate({ _id: tItem._id },
            {
                $set: {
                    'name': tItem.name, 'description': tItem.description, 'tagList' : tItem.tagList
                }
            }, {new: true});
    }

    removeItem = async (_id) => {
        return await Item.findOneAndDelete({_id: _id});
    }
}