import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

const loginApi = express.Router();

loginApi.post("/login", passport.authenticate("local", {
  failureRedirect: "/api/auth/login-failure",
  successRedirect: "/api/auth/login-success",
  // failureFlash: true,
}))

loginApi.get("/login-failure", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(401).json({
    success: false,
    message: "Your password or username are incorrect. Please check again"
  })
})

loginApi.get("/login-success", (req: Request, res: Response, _next: NextFunction) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "You are authenticated",
      user: req.user
    })
  } else {
    res.status(401).json({
      success: false,
      message: "You are not authenticated",
      user: {},
    })
  }
})


export default loginApi;