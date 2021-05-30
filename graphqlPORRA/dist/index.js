"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var http = require("http");
var server = http.createServer(app_1.default);
server.listen(3000);
server.on('listening', function () { return console.log('Listening on port 3000'); });
