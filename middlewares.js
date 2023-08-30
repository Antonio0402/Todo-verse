"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = exports.errHandler = exports.notFound = void 0;
var allowedOrigins_js_1 = require("./config/allowedOrigins.js");
function notFound(req, res, next) {
    res.status(404);
    var error = new Error("\uD83D\uDD0D - Not Found - ".concat(req.originalUrl));
    if (req.accepts("json")) {
        res.json({ "Error": error });
    }
    else {
        res.type("txt").send(error);
    }
}
exports.notFound = notFound;
function errHandler(err, _req, res) {
    var statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? '🥞' : err.stack
    });
}
exports.errHandler = errHandler;
var credentials = function (req, res, next) {
    var origin = req.headers.origin;
    if (origin && allowedOrigins_js_1.default.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};
exports.credentials = credentials;
