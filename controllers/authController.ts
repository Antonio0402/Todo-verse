import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { signJwt } from "../lib/utils.js";
import { query } from "../todos/todos.database.js";
import { QueryResult } from "pg";
import { User } from "../model/user.model.js";

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { user_email, password } = req.body;
  if (!user_email || !password) return res.status(400).json({ "message": "User's email or password are required!" });
  try {
    const result: QueryResult<User> = await query('SELECT * FROM public.users WHERE user_email = $1', [user_email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json(`User is not found with email: ${user_email}`)
    }
    const isValid = await bcrypt.compare(password, user.hashed_password);
    if (!isValid) {
      return res.status(401).json(`Incorrect password`);
    }
    const accessToken = await signJwt({ "sub": user.user_email, role: "user" }, "access", "1h");
    const refreshToken = await signJwt({ "sub": user.user_email, role: "user" }, "refresh", "1d");

    req.session.regenerate(async function (err) {
      if (err) next(err)
      // store user information in session, typically a user id
      req.session.user = { accessToken };
      // save the session before redirection to ensure page
      // load does not happen before session is saved

      req.session.save(async function (err) {
        if (err) next(err)
      })
    });


    const updateRefreshToken = await query(`UPDATE public.users SET refresh_token = $1 WHERE user_email = $2 RETURNING *;`, [refreshToken, user.user_email]);
    if (updateRefreshToken.rows.length) {
      res.status(200).json("You are authenticated")
    }
  } catch (error) {
    next(error);
  }
}

export default handleLogin;
