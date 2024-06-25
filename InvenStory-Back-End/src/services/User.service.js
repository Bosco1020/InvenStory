import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
    
export default class UserService {    

    getUser = async (id) => {
        // let tUser;
        // try {
        //     tUser = new User(user);
        // }
        // catch (e) {
        //     throw new Error("Invalid User");
        // }
        const result = await User.find({_id: id});
        return result;
    }

    addUser = async (newUser) => {
        let tUser;
        try {
            tUser = new User(newUser);
            tUser.password = await bcrypt.hash(tUser.password, 8)
        }
        catch (e) {
            throw new Error("Invalid User Object");
        }
        return await tUser.save();
    }

    login = async (body) => {
        try {
            const user = await User.findOne({ name: body.name, email: body.email });
            if (!user) { throw new Error("Invalid login details"); }
            
            const passwordMatches = bcrypt.compareSync(body.password, user.password);

            if (passwordMatches) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                    expiresIn: 86400 });
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: body.password,
                    accessToken: token
                };           
            } else { throw new Error("Invalid login details");  }
        }
        catch (e) {
            return e;
        }
    }
}