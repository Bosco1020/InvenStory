import cors from "cors";
import express from "express";

export default class Server {
    #app;
    #host;
    #port;
    #router;
    #server;

    constructor(port, host, router) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#router = router;
    }

    getApp = () => { return this.#app };

    start = () => {
        // open server & listen on port & host
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is live & listening on http://${this.#host}:${this.#port}`);
        });
        // set router used
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use((req, res, next) => {
            res.header(
                "Access-Control-Allow-Headers",
                "X-Access-Token, Origin, Content-Type, Accept"
            );
            next();
        });
        this.#app.use(
            this.#router.getRouteStartPoint(),
            this.#router.getRouter());
    }

    close = () => { this.#server?.close() };
}