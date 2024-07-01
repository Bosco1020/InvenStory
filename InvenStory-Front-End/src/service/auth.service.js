import axios from "axios";

//const URL = import.meta.env.VITE_APP_USER_URL;
const URL = "http://localhost:3000/auth";

export const login = async (name, email, password) => {
    try {
        const user = { name: name, email: email, password: password };
        const res = await axios.post(`${URL}/login`, user);

        if (res.data.accessToken) { localStorage.setItem(`user`, JSON.stringify(res.data)); }
        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};

export const signUp = async (name, email, password) => {
    try {
        const user = { name: name, email: email, password: password };
        const res = await axios.post(`${URL}/signUp`, user);

        return res.data;
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};

export const logout = () => {
    localStorage.removeItem(`user`);
};