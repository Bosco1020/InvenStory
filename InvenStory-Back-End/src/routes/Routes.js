import { Router } from "express";

import ItemController from "../controllers/Item.controller.js";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";
import ItemValidator from "../middleware/Item.validator.js";

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

        this.#router.get("/auth/usersbyitem/:item", this.#userController.usersByItem)

        this.#router.post("/item/useritems", UserValidator.validateUser(), this.#itemController.getUserItems)

        this.#router.post("/auth/login", UserValidator.validateUser(), this.#userController.login)

        this.#router.put("/auth/updateUserItems", UserValidator.validateUser(), this.#userController.updateUserItems)

        this.#router.put("/auth/updateUserItems/:name", this.#userController.deleteItemFromUsers)

        this.#router.put("/auth/addUserItem", this.#userController.addUserItem)

        this.#router.put("/auth/removeUserFromItem", this.#userController.deleteUserFromItem)

        this.#router.post("/auth/signup", UserValidator.validateUser(), this.#userController.addUser)

        this.#router.get("/item/allitems", this.#itemController.getItems)

        this.#router.get("/item/:id", this.#itemController.getItemID)

        this.#router.put("/item", ItemValidator.validateItem(), this.#itemController.updateItem)

        this.#router.delete("/item/:_id", this.#itemController.deleteItem)

        this.#router.post("/item", ItemValidator.validateItem(), this.#itemController.addItem)
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}