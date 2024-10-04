export default class UserModel {
    constructor(_id, name, password, role, assignedItems) {
        this._id = _id;
        this.name = name;
        this.password = password;
        this.role = role;
        this.assignedItems = assignedItems;
    }
}