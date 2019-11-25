"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
const auth_1 = require("./controllers/auth");
const account_1 = require("./controllers/account");
class Server {
    constructor(port = 8008) {
        this.app = express();
        this.port = port;
        config_1.Config.set(this.app);
        this.buildRoutes();
    }
    setConfig() {
        config_1.Config.set(this.app);
    }
    buildRoutes() {
        const router = express.Router();
        this.app.use(router);
        new auth_1.default(router);
        new account_1.default(router);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Api running on port ${this.port}`);
        });
    }
}
exports.default = Server;
