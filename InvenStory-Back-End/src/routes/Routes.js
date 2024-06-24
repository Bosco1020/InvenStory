import { Router } from "express";
//import UserValidator from "../middleware/User.validator.js";
import UserController from "../controllers/User.controller.js";

export default class Routes {
    #userController;
    #router;
    #routeStartPoint;

    constructor(userController = new UserController(), routeStartPoint = "/") {
        this.#userController = userController;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#openRoutes();
    }

    #openRoutes = () => {
        this.#router.post("/login", this.#userController.login)

        this.#router.post("/signup", this.#userController.addUser)
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}