import bcrypt from "bcrypt"

const hashPassword = async (password) => {
    return await bcrypt.hash(password, process.env.SECRET)
}

const getTestUser = async () => {
    return {
        dbUsers: [
            {
                "_id": "777ebf51cdf1chh8e67b6gc4",
                "user": "Sammy",
                "email": "SammE@example.com",
                "password": await hashPassword("SamPass22!"),
                "__v": 0
            },

            {
                "_id": "888ebf51cdf5chh8e67b6gc5",
                "user": "Jules",
                "email": "JulYee@exp.co.uk",
                "password": await hashPassword("Jul@Yee33"),
                "__v": 0
            }
        ],
        newUser: {
            "user": "Siobahn",
            "email": "Sio@emails.fr",
            "password": await hashPassword("Han@Sio42")
        }
    }
}

export default getTestUser