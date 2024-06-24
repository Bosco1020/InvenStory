import mongoose from "mongoose";

export default class Database {
    // #connectionAttempts = 0;
    #uri;

    constructor(uri) {
        this.#uri = uri;
    }

    connect = async () => {
        try {
            await mongoose.connect(this.#uri);
            console.log(`Connection to ${this.#uri} is successful`);
        }
        catch (e) {
            console.log(e);
        }
    }

    close = async () => {
        await mongoose.disconnect();
    };
}