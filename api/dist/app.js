"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const PORT = parseInt(process.env.PORT);
new server_1.default(PORT).start();
