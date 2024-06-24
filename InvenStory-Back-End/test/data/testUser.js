import bcrypt from "bcrypt"

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 8)
}

const getTestUser = async () => {
    return {
        dbUsers: [
            {
                "name": "Sammy",
                "email": "SammE@example.com",
                "password": await hashPassword("SamPass22!"),
                "__v": 0
            },

            {
                "name": "Jules",
                "email": "JulYee@exp.co.uk",
                "password": await hashPassword("Jul@Yee33"),
                "__v": 0
            }
        ],
        newUser: {
            "name": "Siobahn",
            "email": "Siobahn@emails.com",
            "password": "Hans!Sion42",
        }
    }
}

export default getTestUser