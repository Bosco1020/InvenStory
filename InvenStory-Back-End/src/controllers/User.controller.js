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
            //const updated = await this.#service.findItem();

            //if (!updated._id) throw new Error("ERROR: User not found in database");
            res.status(200).json(updated);
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    }

    usersByItem = async (req, res) => {
        const { item } = req.params;
        try {
            const allUsers = await this.#service.getUsersByItem(item);
            // if (!allUsers[0]) {allUsers[0] = "-none-"; allUsers[1] = "";}
                // throw new Error("ERROR: No Users with that item found in database");
            res.status(200).json(allUsers);
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
            //res.json(user);
            res.header("X-Access-Token", user.accessToken).status(200).json(user);
        } catch (error) {
            res.status(401).json(error);
            //if error.message === (xyz).message
            // return 401, error.message
            // return 500, error.message
        }
        return res;
    }
}