import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const logoutApi = express.Router();

if (!(process.env.CLIENT_ORIGIN_URL)) {
  throw new Error("Missing required environment variables");
}
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

logoutApi.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  //* Removes req.user, and clears the session.passport value from the session.
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  });
})

export default logoutApi;