import axios from "axios";
import authToken from "../utils/auth-token.js";

const URL = import.meta.env.VITE_APP_USER_URL;
const ITEM_URL = import.meta.env.VITE_APP_API_URL;


export const getAllUsers = async (item) => {
    try {
        const res = await axios.get(`${URL}/usersbyitem/${item}`, { headers: authToken() });
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
    try {
        const res = await axios.post(`${ITEM_URL}`, item, { headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
}

export const deleteItem = async (_id) => {
    try {
        const res = await axios.delete(`${ITEM_URL}/${_id}`, { headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
}

export const deleteItemFromUsers = async (name) => {
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