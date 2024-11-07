import UserService from "../services/User.service.js";

export default class UserController {
    #service;

    constructor(service = new UserService()) {
        this.#service = service;
    }

    getUser = async (req, res) => {
        const error = new Error("Invalid User Object");
        const { _id } = req.params;
        try {
            const checkLogin = await this.#service.getUser(_id);
            if (!checkLogin[0]) throw new Error("ERROR: User not found in database");
            res.status(200).json(checkLogin);
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    updateUserItems = async (req, res) => {
        const error = new Error("Invalid User Object");
        try {
            if (!req.body) throw error; //No Body = error
            const updated = await this.#service.updateItems(req.body);
            res.status(200).json(updated);
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    }

    addUserItem = async (req, res) => {
        const error = new Error("Invalid User Details");
        try {
            if (!req.body) throw error; //No Body = error
            const updated = await this.#service.addItem(req.body);
            if (updated.upsertedCount == 0) throw error; // upserted tracks how many fields altered

            res.status(200).json(updated);
        }
        catch (e) {
            if (e.message === error.message)
                res.status(400).json({ message: e.message });
            res.status(500).json({ message: e.message });
        }
    }

    usersByItem = async (req, res) => {
        const { item } = req.params;
        try {
            const allUsers = await this.#service.getUsersByItem(item);
            if (!allUsers[0]) allUsers[0] = { "name": "-none-" };
            res.status(200).json(allUsers);
        }
        catch (e) {
            if (e.message == "ERROR: No Users with that item found in database") res.status(400).json({ message: e.message });
            res.status(500).json({ message: e.message });
        }
    }

    deleteItemFromUsers = async (req, res) => {
    const { name } = req.params;
    try {
        res.status(200).json(await this.#service.deleteItem(name));
    }
    catch (e) {
        res.status(500).json({ message: e.message });
        }
    }

    deleteUserFromItem = async (req, res) => {
    try {
        res.status(200).json(await this.#service.removeUser(req.body));
    }
    catch (e) {
        res.status(500).json({ message: e.message });
        }
    }

    addUser = async (req, res) => {
        const error = new Error("Invalid User Details");
        try {
            if (!req.body) throw error; //No Body = error
            const newUser = await this.#service.addUser(req.body);
            if (!newUser._id) throw new Error("ERROR: User not created in database");
            res.status(201).json(newUser); //Return 201 for successfully created & object
        }
        catch (e) {
            if (e.message == error.message) res.status(400).json({ message: e.message });
            // ^ If message is same as Service when request is wrong
            res.status(500).json({ message: e.message });
        }
    }

    login = async (req, res) => {
        const error = new Error("Login Failed");
        try {
            const user = await this.#service.login(req.body);
            if (!user.accessToken) { throw error; }
            res.header("X-Access-Token", user.accessToken).status(200).json(user);
        } catch (error) {
            res.status(401).json(error);
        }
        return res;
    }
}