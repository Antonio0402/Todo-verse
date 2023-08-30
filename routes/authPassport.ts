import express from "express";
import { loginFailure, loginSuccess } from "../controllers/passportAuthController.js"
import registerController from "../controllers/registerController.js";
import logoutController from "../controllers/logoutController.js";
import passport from "passport";

const authentication = express.Router();

authentication.post("/login", passport.authenticate('local', {
  failureRedirect: "/api/auth/login-failure",
  successRedirect: "/api/auth/login-success",
  // failureFlash: true,
}));
authentication.get("/login-failure", loginFailure);
authentication.get("/login-success", loginSuccess);

authentication.post("/register", registerController);
authentication.get("/logout", logoutController);

export default authentication;