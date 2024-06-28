import ItemService from "../services/Item.service.js";

export default class ItemController {
    #service;

    constructor(service = new ItemService()) {
        this.#service = service;
    }

    getItems = async (req, res) => {
        try {
            const result = await this.#service.getAllItems();
            if (!result[0]) throw new Error("ERROR: Items not found in database");
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}