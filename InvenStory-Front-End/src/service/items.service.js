import axios from "axios";
import authToken from "../utils/auth-token.js";

const URL = import.meta.env.VITE_APP_API_URL;


export const getItemsData = async () => {
    try {
        const res = await axios.get(`${URL}/allitems`, { headers: authToken() });
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};