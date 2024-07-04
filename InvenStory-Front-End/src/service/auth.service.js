import axios from "axios";

const URL = import.meta.env.VITE_APP_USER_URL;

export const login = async (name, email, password) => {
    try {
        const user = { name: name, email: email, password: password };
        const res = await axios.post(`${URL}/login`, user);

        if (res.data.accessToken) { localStorage.setItem(`user`, JSON.stringify(res.data), {headers: {"x-access-token": "token"} }); }
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
        const res = await axios.post(`${URL}/signUp`, user, { headers: { "x-access-token": "token" } });

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