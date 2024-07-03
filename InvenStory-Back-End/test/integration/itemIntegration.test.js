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

        it("Responds with items from DB if successful", async () => {
            // Arrange
            // Act
            const res = await request.get("/item/allitems");
            // Assert
            expect(res.body[0].name).to.equal(testItems[0].name);
            expect(res.body[1].name).to.equal(testItems[1].name);
            expect(res.body[2].name).to.equal(testItems[2].name);
            expect(res.body[3].name).to.equal(testItems[3].name);
            expect(res.body[4].name).to.equal(testItems[4].name);

            expect(res.body[0].description).to.equal(testItems[0].description);
            expect(res.body[1].description).to.equal(testItems[1].description);
            expect(res.body[2].description).to.equal(testItems[2].description);
            expect(res.body[3].description).to.equal(testItems[3].description);
            expect(res.body[4].description).to.equal(testItems[4].description);

            expect(res.body[0].tagList[0]).to.equal(testItems[0].tagList[0]);
            expect(res.body[1].tagList[0]).to.equal(testItems[1].tagList[0]);
            expect(res.body[2].tagList[0]).to.equal(testItems[2].tagList[0]);
            expect(res.body[3].tagList[0]).to.equal(testItems[3].tagList[0]);
            expect(res.body[4].tagList[0]).to.equal(testItems[4].tagList[0]);
        });

        it("Responds with HTTP 500 if unsuccessful", async () => {
            // Arrange
            await Item.deleteMany();
            // Act
            const res = await request.get("/item/allitems");
            // Assert
            expect(res.status).to.equal(500);
        });
    });
    describe("GET '/item/:id' requests", () => {

        let all;
        let id;
        beforeEach(async () => {
            all = await request.get("/item/allitems");
            id = all.body[0]._id;
        });

        afterEach(() => {
            all = undefined;
            id = undefined;
        });

        it("Responds with HTTP 200 if successful", async () => {
            // Arrange
            // Act
            const res = await request.get(`/item/${id}`);
            // Assert
            expect(res.status).to.equal(200);
        });

        it("Responds with HTTP 500 if unsuccessful", async () => {
            // Arrange
            // Act
            const res = await request.get(`/item/000000000`);
            // Assert
            expect(res.status).to.equal(500);
        });

        it("Responds with matching item details if successful", async () => {
            // Arrange
            // Act
            const res = await request.get(`/item/${id}`);
            // Assert
            expect(res.body[0].name).to.equal(testItems[0].name);
            expect(res.body[0].description).to.equal(testItems[0].description);
            expect(res.body[0].tagList[0]).to.equal(testItems[0].tagList[0]);
            expect(res.body[0].tagList[1]).to.equal(testItems[0].tagList[1]);
            expect(res.body[0].tagList[2]).to.equal(testItems[0].tagList[2]);
        });
    });

    describe("POST '/item' requests", () => {
        let newItem;
        beforeEach(async () => {
            newItem = {
                "name": "New Item",
                "description": "A new item for testing",
                "tagList": [
                    "Item",
                    "Test"
                ]
            };
        });
        it("Responds with HTTP 201 if successful", async () => {
            // Arrange
            // Act
            const res = await request.post("/item").send(newItem);
            // Assert
            expect(res.status).to.equal(201);
        });

        it("Responds with HTTP 400 if item isn't valid", async () => {
            // Arrange
            // Act
            const res = await request.post("/item").send({item: "not an item"});
            // Assert
            expect(res.status).to.equal(400);
        });

        it("Responds with saved item is successful", async () => {
            // Arrange
            // Act
            const res = await request.post("/item").send(newItem);
            // Assert
            expect(res.body.name).to.equal(newItem.name);
            expect(res.body.description).to.equal(newItem.description);
            expect(res.body.tagList[0]).to.equal(newItem.tagList[0]);
            expect(res.body.tagList[1]).to.equal(newItem.tagList[1]);
            expect(res.body._id).to.not.equal(undefined);
        });
    });
    describe("POST '/item/useritems'", async () => {
        let tempUser = {
            "name": "Sammy",
            "email": "SammE@example.com",
            "password": "SamPassword22!",
            "role": 1,
            "assignedItems": ["Book", "Elder Wand"]
        }

        it("Responds with HTTP 200 if successful", async () => {
            // Arrange
            // Act
            const res = await request.post("/item/useritems").send(tempUser);
            // Assert
            expect(res.status).to.equal(200);
        });

        it("Returns array of items if successful", async () => {
            // Arrange
            // Act
            const res = await request.post("/item/useritems").send(tempUser);
            // Assert
            expect(res.body[0].name).to.equal("Book");
            expect(res.body[0].description).to.equal("A weird book found in the forest");
            expect(res.body[1].name).to.equal("Elder Wand");
            expect(res.body[1].description).to.equal("Gifted by Harry Hopper, the bun who lived");
        });

        it("Responds with HTTP 400 if invalid user object sent", async () => {
            // Arrange
            const testUser = { name: "Not a user" };
            // Act
            const res = await request.post("/item/useritems").send(testUser);
            // Assert
            expect(res.status).to.equal(400);
        });
    });

    describe("PUT '/item'", async () => {
        let changedItem4;

        beforeEach(async () => {
            let all = await request.get("/item/allitems");
            let id = all.body[4]._id;
            changedItem4 = { ...dbItems[4], _id: id };
            changedItem4 = { ...changedItem4, tagList: ["Item"] };
        })

        it("Responds with HTTP 200 if successful", async () => {
            // Arrange
            // Act
            const res = await request.put("/item").send(changedItem4);
            // Assert
            expect(res.status).to.equal(200);
        });

        it("Responds with HTTP 400 if invalid item object sent", async () => {
            // Arrange
            const testItem = { name: "Not an item" };
            // Act
            const res = await request.put("/item").send(testItem);
            // Assert
            expect(res.status).to.equal(400);
        });
        it("Responds with edited item if successful", async () => {
            // Arrange
            // Act
            const res = await request.put("/item").send(changedItem4);
            // Assert
            expect(res.body.tagList[0]).to.equal("Item");
        });
    });

    describe("DELETE '/item'", async () => {
        // let changedItem4;

        beforeEach(async () => {
            // let all = await request.get("/item/allitems");
            // let id = all.body[4]._id;
            // changedItem4 = { ...dbItems[4], _id: id };
            // changedItem4 = { ...changedItem4, tagList: ["Item"] };
        })

        it("Responds with HTTP 200 if successful", async () => {
            // Arrange
            // Act
            console.log(testItems[4]._id)
            const res = await request.delete(`/item/${testItems[4]._id}`);
            // Assert
            expect(res.status).to.equal(200);
        });

        it("Items in database reduced by 1 if successful", async () => {
            // Arrange
            const oldLength = testItems.length;
            // Act
            const res = await request.delete(`/item/${testItems[4]._id}`);
            let all = await request.get("/item/allitems");
            // Assert
            expect(all.length).not.to.equal(oldLength);
        });
    });
});
    
