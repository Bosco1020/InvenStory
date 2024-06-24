import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import Routes from "./routes/Routes.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;
const routes = new Routes();
const server = new Server(PORT, HOST, routes);
const db = new Database(DB_URI);
server.start();
await db.connect();