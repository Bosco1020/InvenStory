import { Router } from "express";

import ItemController from "../controllers/Item.controller.js";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";

export default class Routes {
    #itemController;
    #userController;
    #router;
    #routeStartPoint;

    constructor(userController = new UserController(), itemController = new ItemController(), routeStartPoint = "/") {
        this.#itemController = itemController;
        this.#userController = userController;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#openRoutes();
    }

    #openRoutes = () => {
        this.#router.get("/auth/user/:_id", this.#userController.getUser)

        this.#router.post("/auth/login", UserValidator.validateUser(), this.#userController.login)

        this.#router.put("/auth/updateItems", UserValidator.validateUser(), this.#userController.updateItems)

        this.#router.post("/auth/signup", UserValidator.validateUser(), this.#userController.addUser)

        this.#router.get("/item/allitems", this.#itemController.getItems)

        this.#router.get("/item/:id", this.#itemController.getItemID)

        this.#router.post("/item", this.#itemController.addItem)
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}