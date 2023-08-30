import express, { Request, Response, NextFunction } from "express";
import { pool } from "../todos/todos.database.js";
import { bCryptGenPass } from "../lib/utils.js";

const registerApi = express.Router();

registerApi.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  const { user_email, password } = req.body;
  const hash = bCryptGenPass(password);
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email])
    const alreadyExistensUser = user.rows[0];
    if (alreadyExistensUser) {
      return res.status(409).json({ message: "User with email already exists!" });
    }
    const register_result = await pool.query("INSERT INTO users(user_email, hashed_password) VALUES($1, $2)", [user_email, hash]);
    console.log('User Registration succesful');
    req.login(register_result.rows[0], (err) => {
      if (err) {
        return next(err)
      }
      res.redirect("/")
    })
  } catch (error) {
    next(error);
  }
})

export default registerApi;