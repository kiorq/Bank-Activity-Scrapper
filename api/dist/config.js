"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
class Config {
    static set(app) {
        app = app;
        app.use(bodyParser.json());
    }
}
exports.Config = Config;
