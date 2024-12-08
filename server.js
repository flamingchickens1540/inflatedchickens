"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = require("express");
var ws_1 = require("./ws");
var handler_js_1 = require("./build/handler.js");
var dotenv = require("dotenv");
dotenv.config();
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
// Inject SocketIO
(0, ws_1.default)(server);
// SvelteKit handlers
app.use(handler_js_1.handler);
server.listen(process.env.PUBLIC_WS_ENDPOINT, function () {
    console.log('Running on http://localhost:' + PUBLIC_WS_ENDPOINT);
});
