// import passport from "passport";
// import { IVerifyOptions } from 'passport-local';

// const LocalStrategy = require("passport-local").Strategy;

// import bcrypt from "bcrypt";
// import { pool } from "./todos/todos.database.js";
// import { User } from "./model/user.model.js";

// //* Passport config;

// passport.serializeUser((serializeUser, done) => {
//   console.log("serializing user: ", serializeUser);
//   done(null, serializeUser.user_email)
// });

// passport.deserializeUser(async (deserializeUser: string, done) => {
//   try {
//     const res = await pool.query('SELECT * FROM public.users WHERE user_email = $1', [deserializeUser])
//     const user: User = res.rows[0];
//     if (user) {
//       console.log("deserializing user: ", deserializeUser);
//       done(null, user)
//     } else {
//       done(new Error("User is not exists on database"))
//     }
//   } catch (error) {
//     done(error);
//   }
// })

// const verifyCallback = async (user_email: string, password: string, done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void) => {
//   try {
//     const res = await pool.query('SELECT * FROM public.users WHERE user_email = $1', [user_email])
//     const user: User = res.rows[0];
//     if (!user) {
//       console.log("User not found with email: " + user_email)
//       return done(null, false)
//     }
//     if (user.hashed_password) {
//       const isValid = await bcrypt.compare(password, user.hashed_password);
//       if (!isValid) {
//         return done(null, false, { message: 'Incorrect password.' })
//       }
//       return done(null, user)
//     }
//   } catch (error) {
//     done(error)
//   }
// }

// passport.use(new LocalStrategy({
//   usernameField: "user_email",
// }, verifyCallback));


