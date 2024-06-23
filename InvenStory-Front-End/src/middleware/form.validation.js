
export const validateEmail = (email) => {
    return (/^[\w-\.]+@([\w-]+\.+[\w-])+[\w-]{1,4}$/.test(email));
}

export const validatePassword = (password) => {
    return (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password));
}