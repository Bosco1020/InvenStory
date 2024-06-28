import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";
import bcrypt from "bcrypt";

import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";
import User from "../../src/models/User.model.js";
import UserController from "../../src/controllers/User.controller.js";
import Routes from "../../src/routes/Routes.js";
import UserService from "../../src/services/User.service.js";

import getTestUser from "../data/testUser.js";
const { dbUsers, Users, newUser } = await getTestUser();



describe.skip("SignUp tests", () => {
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
            expect(bcrypt.compareSync(newUser.password, res.body.password)).to.equal(true);
        });

        it("Responds with HTTP 400 if no Name", async () => {
            // Arrange
            const testUser = { ...newUser }
            delete testUser.name;
            // Act
            const res = await request.post("/auth/SignUp").send(testUser);
            // Assert
            expect(res.status).to.equal(400);
        });

        it("Responds with HTTP 400 if Email is invalid", async () => {
            // Arrange
            const testUser = { ...newUser, email: "bademail" };
            // Act
            const res = await request.post("/auth/SignUp").send(testUser);
            // Assert
            expect(res.status).to.equal(400);
        });

        it("Responds with HTTP 400 if no Email", async () => {
            // Arrange
            const testUser = { ...newUser };
            delete testUser.email;
            // Act
            const res = await request.post("/auth/SignUp").send(testUser);
            // Assert
            expect(res.status).to.equal(400);
        });

        it("Responds with HTTP 400 if Password is invalid", async () => {
            // Arrange
            const testUser = { ...newUser, password: "badpassword" };
            // Act
            const res = await request.post("/auth/SignUp").send(testUser);
            // Assert
            expect(res.status).to.equal(400);
        });

        it("Responds with HTTP 400 if no Password", async () => {
            // Arrange
            const testUser = { ...newUser };
            delete testUser.password;
            // Act
            const res = await request.post("/auth/SignUp").send(testUser);
            // Assert
            expect(res.status).to.equal(400);
        });
    });

    describe("POST '/auth/Login' requests", () => {
        it("Responds with HTTP 200 if successful", async () => {
            // Arrange
            // Act
            const res = await request.post("/auth/Login").send(Users[0]);
            // Assert
            expect(res.status).to.equal(200);
        });

        it("Responds with HTTP 401 if Name is incorrect", async () => {
            // Arrange
            const testUser = { ...Users[0], name: "notCorrect" };
            // Act
            const res = await request.post("/auth/Login").send(testUser);
            // Assert
            expect(res.status).to.equal(401);
        });

        it("Responds with HTTP 401 if Email is incorrect", async () => {
            // Arrange
            const testUser = { ...Users[0], email: "not@Correct.email" };
            // Act
            const res = await request.post("/auth/Login").send(testUser);
            // Assert
            expect(res.status).to.equal(401);
        });

        it("Responds with HTTP 401 if Password is incorrect", async () => {
            // Arrange
            const testUser = { ...Users[0], password: "n0!C0rrect" };
            // Act
            const res = await request.post("/auth/Login").send(testUser);
            // Assert
            expect(res.status).to.equal(401);
        });
    });

    describe("GET '/auth/user/:_id' requests", () => {
        let response;
        beforeEach(async () => {
            response = await request.post("/auth/Login").send(Users[0]);
        });

        it("Responds with HTTP 200 if successful", async () => {
            // Arrange
            // Act
            const res = await request.get(`/auth/user/${response.body._id}`)
            // Assert
            expect(res.status).to.equal(200);
        });
        
        it("Responds with HTTP 500 if _id isn't in database", async () => {
            // Arrange
            // Act
            const res = await request.get(`/auth/user/notARealId5u890438765903740`)
            // Assert
            expect(res.status).to.equal(500);
        });

        it("Returns user data if successful", async () => {
            // Arrange
            // Act
            const res = await request.get(`/auth/user/${response.body._id}`)
            // Assert
            expect(res.body[0]._id).to.equal(response.body._id);
            expect(res.body[0].name).to.equal(response.body.name);
            expect(res.body[0].email).to.equal(response.body.email);
            expect(bcrypt.compareSync(response.body.password, res.body[0].password)).to.equal(true);
        });

        it("Responds with HTTP 404 if no parameter passed", async () => {
            // Arrange
            // Act
            const res = await request.get(`/auth/user/`)
            // Assert
            expect(res.status).to.equal(404);
        });
    });

    describe("PUT '/auth/update' requests", () => {
        it("Responds with HTTP 204 if successful", async () => {
            // Arrange
            const testUser = { ...Users[0], assignedItems: [{ name: "Item1" }, { name: "Item2" }] };
            // //const testUser = { ...Users[0], email: "email2@num.vom", assignedItems: [{name:"Item1"},{name:"Item2"}] };
            // console.log(testUser);
            // // Act
            const res = await request.put(`/auth/updateItems`).send(testUser);
            // // Assert
            console.log(res.body);
            console.log(res.body[0]);
            
            // Assert
            expect(res.status).to.equal(204);
            //expect(res.status).to.equal(201);
        });
    });
});