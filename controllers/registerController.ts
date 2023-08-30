import { Request, Response, NextFunction } from "express";
import { query } from "../todos/todos.database.js";
import { bCryptGenPass } from "../lib/utils.js";

const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_email, password } = req.body;
  if (!user_email || !password) return res.status(400).json({ "message": "username and password are required!" });

  const user = await query("SELECT * FROM public.users WHERE user_email = $1;", [user_email])
  if (user.rows.length) {
    return res.status(409).json({ message: `User with ${user_email} already exists!` });
  }
  try {
    const hash = bCryptGenPass(password);
    const register_result = await query("INSERT INTO public.users(user_email, hashed_password) VALUES($1, $2) RETURNING *;", [user_email, hash]);


    if (register_result.rows.length) {
      res.status(201).json(`New user ${user_email} has been created successfully!`)
    } else {
      res.status(403).json(`There was a problem. Can't create new user successfully!`)
    }
  } catch (error) {
    next(error);
  }
}

export default registerController;