const authToken = () => {
    const token = JSON.parse(localStorage.getItem(`user`));

    if (token && token.accessToken) {
        return {
            "x-access-token": token.accessToken
        }
    }
    else {
        return {};
    }
}

export default authToken;
