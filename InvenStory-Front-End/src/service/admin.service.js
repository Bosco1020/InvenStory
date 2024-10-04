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
        // if (res.data[0] == undefined) res.data[0] = { name: "-none" };
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
}

export const addItem = async (item) => {
    // call API to update item in database,
    try {
        const res = await axios.post(`${ITEM_URL}`, item, { headers: authToken() });

        // if (res.data[0] == undefined) res.data[0] = { name: "-not Found-" };
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
}

export const deleteItem = async (_id) => {
    //! NEED TO ALSO REMOVE FROM ALL USERS
    // Similar to usersByItem, create another delete for that and call immediately after

    // call API to update item in database,
    try {
        const res = await axios.delete(`${ITEM_URL}/${_id}`, { headers: authToken() });
        // if (res.data[0] == undefined) res.data[0] = { name: "-not Found-" };
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
}

export const deleteItemFromUsers = async (name) => { // Removes an item from all users assigned items?
    //? Check what this does...
    try {
        const res = await axios.put(`${URL}/updateUserItems/${name}`, { headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
}

export const removeUserFromItem = async (user, item) => {
    try {
        const res = await axios.put(`${URL}/removeUserFromItem`, { userName: user, itemName: item }, { headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
}
// Need to remove an item from any users assigned items, irrespective of current user (so long as admin!)
// Call PUT on auth, findOneAndUpdate, filter by users name, update items to same -target
// Use Body, have itemName: X, userName: Y,

export const addItemToUser = async (user, item) => {
    try {
        const res = await axios.put(`${URL}/addUserItem`, { userName: user, itemName: item }, { headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
}