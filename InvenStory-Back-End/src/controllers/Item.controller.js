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

    getItemID = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.#service.getItem(id);
            if (!result) throw new Error("ERROR: Item not found in database");
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    addItem = async (req, res) => {
        try {
            const newItem = await this.#service.addItem(req.body);
            //if (!newItem._id) { res.status(403).json({ message: "Item already in Database" }); return; }
            if (!newItem) throw new Error("ERROR: Favourite not created in database");
            res.status(201).json(newItem); //Return 201 for successfully created & object
        }
        catch (e) {
            if (e.message.startsWith("Item validation failed")) res.status(400).json({ message: e.message });
            res.status(500).json({ message: e.message });
        }
    };
}