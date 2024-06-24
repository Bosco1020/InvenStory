import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";

import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/User.model.js";
import UserController from "../../src/controllers/User.controller.js";
import Routes from "../../src/routes/Routes.js";
import UserService from "../../src/services/User.service.js";

import getTestUser from "../data/testUser.js";
const { dbUsers, newUser } = await getTestUser();



describe("SignUp tests", () => {
    let userServer;
    let userService;
    let database;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        userService = new UserService();
        const userController = new UserController(userService);
        const routes = new Routes(userController);
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, routes);
        userServer.start();
        request = supertest(userServer.getApp())
    });

    after(async () => {
        await userServer.close();
        await database.close();
    });

    beforeEach(async () => {
        try {
            await User.deleteMany();
            console.log("Database cleared")
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing");
            throw new Error();
        }

        try {
            await User.insertMany(dbUsers);
            console.log("Database populated with test users");
        } catch (e) {
            console.log(e.message);
            console.log("Error inserting");
            throw new Error();
        }
    });

    describe("POST '/auth/SignUp' requests", () => {
        it("Responds with HTTP 201 if successful", async () => {
            // Arrange
            // Act
            const res = await request.post("/auth/SignUp").send(newUser);
            // Assert
            expect(res.status).to.equal(201);
        });

        it("Responds with user data if successful", async () => {
            // Arrange
            // Act
            const res = await request.post("/auth/SignUp").send(newUser);
            // Assert
            expect(res.body.name).to.equal(newUser.name);
            expect(res.body.email).to.equal(newUser.email);
            expect(res.body.password).to.equal(newUser.password);
        });
    });
});