export default class ItemModel {
    constructor(_id, name, description, tagList) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.tagList = tagList;
    }
}