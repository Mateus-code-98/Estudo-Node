"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/home', function (req, res) {
    return res.send({ hello: "Hello World" });
});
app.listen(3000, function () { return console.log("Listening on port 3000 ..."); });
