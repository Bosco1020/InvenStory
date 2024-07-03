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
                "role": 1,
                "assignedItems": ["Book", "Elder Wand"],
                "__v": 0
            },

            {
                "name": "Jules",
                "email": "JulYee@exp.co.uk",
                "password": await hashPassword("Jul@Yee33"),
                "role": 2,
                "assignedItems": ["Book"],
                "__v": 0
            }
        ],
        Users: [
            {
                "name": "Sammy",
                "email": "SammE@example.com",
                "password": "SamPass22!",
                "role": 1
            },

            {
                "name": "Jules",
                "email": "JulYee@exp.co.uk",
                "password": "Jul@Yee33",
                "role": 2
            }
        ],
        newUser: {
            "name": "Siobahn",
            "email": "Siobahn@emails.com",
            "password": "Hans!Sion42",
            "role": 1
        }
    }
}

export default getTestUser