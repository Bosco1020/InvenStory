const getTestUser = async () => {
    return {
        dbUsers: [
            {
                "name": "Sammy",
                "email": "SammE@example.com",
                "password": "SamPass22!",
                "role": 1,
                "__v": 0
            },

            {
                "name": "Jules",
                "email": "JulYee@exp.co.uk",
                "password": "Jul@Yee33",
                "role": 2,
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