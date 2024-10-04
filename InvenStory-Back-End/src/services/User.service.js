import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
    
export default class UserService {    

    getUser = async (id) => {
        //const result = await User.find({_id: id});
        const result = await User.find({_id: id});
        return result;
    }

    getUsersByItem = async (item) => {
        const result = await User.find({assignedItems: `${item}`});
        return result;
    }

    deleteItem = async (name) => {
        const result = await User.updateMany({ assignedItems: `${name}` }, {$pull :{assignedItems: `${name}` }}, {multi: true});

        return result;

        // delete item form all users:
        // updateMany({}, { $pull: {assignedItems: itemName}})
    }

    removeUser = async (body) => {
        //Find target user - YES
        // update existing array to NOT contain target - Hmm

        // {$pull: {assignedItems: {$in: body.itemName}}}
        const result = await User.findOneAndUpdate({ name: body.userName }, { $pull: { assignedItems: body.itemName } });
        //const result = await User.findOneAndUpdate({ name: body.userName }, { assignedItems: body.assignedItems }, { upsert: true, returnOriginal: false, returnNewDocument: true });
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

    updateItems = async (body) => {
        try {
            let tUser = User(body);
        }
        catch (e) {
            throw new Error("Invalid User Details");
        }
        const result = await User.findOneAndUpdate({ name: body.name }, { assignedItems: body.assignedItems }, { upsert: true, returnOriginal: false, returnNewDocument: true });
        return result;
    }

    addItem = async (body) => {
        // Assign an item to a user
        const result = await User.updateOne({ name: body.userName }, { $push: { assignedItems: body.itemName } }, { upsert: false, returnOriginal: false, returnNewDocument: true });
        return result;
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
                    assignedItems: user.assignedItems,
                    role: user.role,
                    accessToken: token
                };           
            } else { throw new Error("Invalid login details");  }
        }
        catch (e) {
            return e;
        }
    }
}