import { Router } from "express";

import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";

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
        this.#router.get("/auth/user/:_id", this.#userController.getUser)

        this.#router.post("/auth/login", UserValidator.validateUser(), this.#userController.login)

        this.#router.post("/auth/signup", UserValidator.validateUser(), this.#userController.addUser)
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}