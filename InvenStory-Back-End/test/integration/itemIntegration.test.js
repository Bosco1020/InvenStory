import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";
import bcrypt from "bcrypt";

import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";
import Item from "../../src/models/Item.model.js";
import ItemController from "../../src/controllers/Item.controller.js";
import Routes from "../../src/routes/Routes.js";
import ItemService from "../../src/services/Item.service.js";

import UserController from "../../src/controllers/User.controller.js";

import getTestItems from "../data/testItem.js";
const { testItems, dbItems } = await getTestItems();



describe("Items Tests", () => {
    let itemServer;
    let itemService;
    let database;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        itemService = new ItemService();
        const itemController = new ItemController(itemService);
        const routes = new Routes( new UserController, itemController);
        database = new Database(DB_URI);
        await database.connect();
        itemServer = new Server(PORT, HOST, routes);
        itemServer.start();
        request = supertest(itemServer.getApp())
    });

    after(async () => {
        await itemServer.close();
        await database.close();
    });

    beforeEach(async () => {
        try {
            await Item.deleteMany();
            console.log("Database cleared")
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing");
            throw new Error();
        }

        try {
            await Item.insertMany(dbItems);
            console.log("Database populated with test users");
        } catch (e) {
            console.log(e.message);
            console.log("Error inserting");
            throw new Error();
        }
    });

    describe("GET '/item/allItems' requests", () => {
        it("Responds with HTTP 200 if successful", async () => {
            // Arrange
            // Act
            const res = await request.get("/item/allitems");
            // Assert
            expect(res.status).to.equal(200);
        });
    });
});
    
