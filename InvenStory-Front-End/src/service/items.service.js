import axios from "axios";
import authToken from "../utils/auth-token.js";

const ITEM_URL = import.meta.env.VITE_APP_API_URL;


export const getAllItemsData = async () => {
    try {
        const res = await axios.get(`${ITEM_URL}/allitems`, { headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};

export const getUsersItemsData = async (user) => {
    try {
        const User = JSON.parse(localStorage.getItem(`user`));
        delete User['accessToken'];
        delete User['_id'];
        const res = await axios.post(`${ITEM_URL}/useritems`, User, {headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};

        // const user = { name: name, email: email, password: password };
        // const res = await axios.post(`${URL}/login`, user);
        //get("/item/:id")
        //post("/item")

        //get("/auth/user/:_id")
        //put("/auth/updateUserItems")