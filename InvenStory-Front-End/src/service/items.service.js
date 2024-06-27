import axios from "axios";

import dummyData from "../../data/dummyItems.json";

//const URL = import.meta.env.VITE_APP_USER_URL;
const URL = "http://localhost:3000/";

export const getItemsData = async () => {
    try {
        //const res = await axios.post(`${URL}/signUp`, user);

        return dummyData.allItems;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};