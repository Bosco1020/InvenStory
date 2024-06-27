import Item from "../models/Item.model";
    
export default class ItemService {    

    getAllItems = async () => {
        return await Item.find({});
    }
}