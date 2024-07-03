import axios from "axios";
import authToken from "../utils/auth-token.js";

const URL = import.meta.env.VITE_APP_USER_URL;
const ITEM_URL = import.meta.env.VITE_APP_API_URL;


export const getAllUsers = async (item) => {
    try {
        const res = await axios.get(`${URL}/usersbyitem/${item}`, { headers: authToken() });
        // const User = JSON.parse(localStorage.getItem(`user`));
        // let list = [];

        // for (let i = 0; i < User.assignedItems.length; i++) {
        //     const res = await axios.get(`${URL}/usersbyitem/${User.assignedItems[i]}`, { headers: authToken() });
        //     list[i] = {name: res.data.name, _id: res.data._id};
        // }

        // return list;
        if (res.data[0] == undefined) res.data[0] = { name: "-none" };
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};

export const editItem = async (item) => {
    // call API to update item in database,
    try {
        const res = await axios.put(`${ITEM_URL}`, item, { headers: authToken() });

        if (res.data[0] == undefined) res.data[0] = { name: "-not Found-" };
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
    // Reload page? Auto? Auto update when reloaded right?
}
