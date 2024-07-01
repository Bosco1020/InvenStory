import axios from "axios";
import authToken from "../utils/auth-token.js";

import dummyData from "../../data/dummyItems.json";

//const URL = import.meta.env.API_URL;
const URL = "http://localhost:3000/item";


export const getItemsData = async () => {
    try {
        const res = await axios.get(`${URL}/allitems`, { headers: authToken() });

        return res.data;
        //return dummyData.allItems;

        //get("/auth/user/:_id", this.#userController.getUser)
        //get("/item/useritems", UserValidator.validateUser(), this.#itemController.getUserItems)
        //post("/auth/login", UserValidator.validateUser(), this.#userController.login)
        //put("/auth/updateUserItems", UserValidator.validateUser(), this.#userController.updateUserItems)
        //post("/auth/signup", UserValidator.validateUser(), this.#userController.addUser)
        //get("/item/allitems", this.#itemController.getItems)
        //get("/item/:id", this.#itemController.getItemID)
        //post("/item", this.#itemController.addItem)
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};