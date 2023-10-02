import { Request, Response, NextFunction } from "express";
import * as jose from "jose";
import { query } from "../../todos/todos.database.js";
import { QueryResult } from "pg";
import { User } from "../../model/user.model.js";

const getUserEmail = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.session.user?.accessToken;
  console.log(accessToken);
  if (accessToken && accessToken?.match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const payload = jose.decodeJwt(accessToken);
      if (payload?.sub) {
        if (payload?.exp && payload.exp * 1000 < Date.now()) {
          return res.status(401).json({
            success: false,
            message: "You are not authenticated",
          });
        }
        const result: QueryResult<User> = await query(`SELECT * FROM public.users WHERE user_email = $1;`, [payload.sub]);
        if (result.rows.length) {
          const { hashed_password, refresh_token, ...rest } = result.rows[0];
          return res.status(200).json({
            success: true,
            message: "You are authenticated",
            user: rest
          })
        }
        return res.status(204).json("No users found!");
      }
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated",
    });
  }
}

export default getUserEmail;