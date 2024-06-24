import { config } from "dotenv";

export default class Config {
    static #env = process.env.NODE_ENV;

    static load = () => {
        // Create appropriate config path depending on .env environment
        config({
            path: `.env${Config.#env !== `prod` ? `.${Config.#env}` : ``}`,
        });
    };
}