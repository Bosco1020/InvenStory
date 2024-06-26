export default class ItemModel {
    constructor(_id, name, description, tagsList) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.tagsList = tagsList;
    }
}