"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passportAuthController_js_1 = require("../controllers/passportAuthController.js");
var registerController_js_1 = require("../controllers/registerController.js");
var logoutController_js_1 = require("../controllers/logoutController.js");
var passport_1 = require("passport");
var authentication = express_1.default.Router();
authentication.post("/login", passport_1.default.authenticate('local', {
    failureRedirect: "/api/auth/login-failure",
    successRedirect: "/api/auth/login-success",
    // failureFlash: true,
}));
authentication.get("/login-failure", passportAuthController_js_1.loginFailure);
authentication.get("/login-success", passportAuthController_js_1.loginSuccess);
authentication.post("/register", registerController_js_1.default);
authentication.get("/logout", logoutController_js_1.default);
exports.default = authentication;
