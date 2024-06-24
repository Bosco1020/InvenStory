import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default class UserService {

    getUser = async (user) => {
        let tUser;
        try {
            tUser = new User(user);
        }
        catch (e) {
            throw new Error("Invalid User");
        }
        const result = await User.find({email: user.email}, {password: user.password});
        return result;
    }

    addUser = async (newUser) => {
        let tUser;
        try {
           tUser = new User(newUser);
        }
        catch (e) {
            throw new Error("Invalid User Object");
        }
        return await tUser.save();
    }

    login = async (body) => {
        try {
            const user = await User.findOne({ email: body.email });
            if (!user) { throw new Error("Invalid login details"); }
            
            //const passwordMatches = bcrypt.compareSync(body.password, user.password);
            const passwordMatches = (body.password == user.password);
            if (passwordMatches) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                    expiresIn: 86400 });
                return {
                    email: user.email,
                    password: user.password,
                    accessToken: token
                };           
            } else { throw new Error("Invalid login details");  }
        }
        catch (e) {
            return e;
        }
    }
}