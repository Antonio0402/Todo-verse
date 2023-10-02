import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config());
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import corsOptions from "./config/corsOptions.js";
import { notFound, errHandler, credentials } from "./middlewares.js";
import { v4 as uuidv4 } from "uuid";
import todosRouter from "./todos/todos.router.js";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import connectPg from "connect-pg-simple"
import passport from "passport";
import authentication from "./routes/authPassport.js";

import { pool } from "./todos/todos.database.js";


//* import middles to handle error and notfound


/**
 * -------------- GENERAL SETUP ----------------
 */

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error("Missing required environment variables");
}

const port = parseInt(process.env.PORT, 10);
const app = express();
app.set('trust proxy', 1)

//* Cross Origin Resource Sharing
// app.use(cors(function (_req, cb) {
//   cb(null, corsOptions);
// }), function (_req, res, next) {
//   res.header('Access-Control-Allow-Credentials', "true");
//   next();
// });

app.use(morgan("dev"));

//* Handle options credentials check - before CORS
//* and fetch cookies credentials requirement
app.use(credentials);

app.use(helmet({
  hsts: {
    maxAge: 31536000,
  },
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      "default-src": ["'none'"],
      "frame-ancestors": ["'none'"],
    },
  },
  frameguard: {
    action: "deny",
  },
}));

app.use(cors(corsOptions));

//* built-in middleware for json
app.use(express.json());

//* built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

//* middleware for cookies
app.use(cookieParser());


/**
 * -------------- SESSION SETUP ----------------
 */

//** Initialize client.
const pgSession = connectPg(expressSession);

//** Initialize store.
app.use(expressSession({
  store: new pgSession({
    pool,
    createTableIfMissing: true,
    schemaName: "public",
    tableName: "session",
  }),
  genid: function (_req) {
    return uuidv4()
  },
  name: "todos.sid",
  secret: "postgres-session",
  resave: false,
  saveUninitialized: false,
  cookie: { path: "/", maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production" ? true : false }
}))


/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
// app.use(passport.initialize());
// app.use(passport.session());
// import * as passportSetup from "./passport"

//* same as passport.session
// app.use(passport.authenticate('session'));

app.use((req, _res, next) => {
  console.log(req.url, req.session && req.session.user);
  next();
})

/**
 * -------------- ROUTES ----------------
 */

import authRoute from "./routes/authRoute.js";
import getUserEmail from "./controllers/user/getUser.js";
import { verifyToken } from "./lib/utils.js";

app.get("^/$|index(.html)?", (_req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
})


const apiRouter = express.Router();
app.use("/api/v1", apiRouter);
apiRouter.use("/auth", authRoute);
apiRouter.get("/user", getUserEmail);
apiRouter.use(verifyToken)
apiRouter.use("/todos", todosRouter);




app.listen(port || 5001, () => {
  console.log("Backend server is running");
});

app.all("*", notFound);
app.use(errHandler);