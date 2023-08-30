"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv = require("dotenv");
var dotenv_expand_1 = require("dotenv-expand");
dotenv_expand_1.default.expand(dotenv.config());
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var corsOptions_js_1 = require("./config/corsOptions.js");
var middlewares_js_1 = require("./middlewares.js");
var uuid_1 = require("uuid");
var todos_router_js_1 = require("./todos/todos.router.js");
var express_session_1 = require("express-session");
var cookie_parser_1 = require("cookie-parser");
var connect_pg_simple_1 = require("connect-pg-simple");
var todos_database_js_1 = require("./todos/todos.database.js");
//* import middles to handle error and notfound
/**
 * -------------- GENERAL SETUP ----------------
 */
if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables");
}
var port = parseInt(process.env.PORT, 10);
var app = (0, express_1.default)();
//* Cross Origin Resource Sharing
// app.use(cors(function (_req, cb) {
//   cb(null, corsOptions);
// }), function (_req, res, next) {
//   res.header('Access-Control-Allow-Credentials', "true");
//   next();
// });
app.use((0, morgan_1.default)("dev"));
//* Handle options credentials check - before CORS
//* and fetch cookies credentials requirement
app.use(middlewares_js_1.credentials);
app.use((0, helmet_1.default)({
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
app.use((0, cors_1.default)(corsOptions_js_1.default));
//* built-in middleware to handle urlencoded form data
app.use(express_1.default.urlencoded({ extended: true }));
//* built-in middleware for json
app.use(express_1.default.json());
//* middleware for cookies
app.use((0, cookie_parser_1.default)());
/**
 * -------------- SESSION SETUP ----------------
 */
//** Initialize client.
var pgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
//** Initialize store.
app.use((0, express_session_1.default)({
    store: new pgSession({
        pool: todos_database_js_1.pool,
        createTableIfMissing: true,
        schemaName: "public",
        tableName: "session",
    }),
    genid: function (_req) {
        return (0, uuid_1.v4)();
    },
    name: "todos.sid",
    secret: "postgres-session",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production" ? true : false, sameSite: "none" }
}));
/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
// app.use(passport.initialize());
// app.use(passport.session());
// import * as passportSetup from "./passport"
//* same as passport.session
// app.use(passport.authenticate('session'));
/**
 * -------------- ROUTES ----------------
 */
var authRoute_js_1 = require("./routes/authRoute.js");
var getUser_js_1 = require("./controllers/user/getUser.js");
var utils_js_1 = require("./lib/utils.js");
app.get("^/$|index(.html)?", function (_req, res) {
    res.json({
        message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    });
});
var apiRouter = express_1.default.Router();
app.use("/api/v1", apiRouter);
apiRouter.use("/auth", authRoute_js_1.default);
apiRouter.get("/user", getUser_js_1.default);
apiRouter.use(utils_js_1.verifyToken);
apiRouter.use("/todos", todos_router_js_1.default);
app.listen(port || 5001, function () {
    console.log("Backend server is running");
});
app.all("*", middlewares_js_1.notFound);
app.use(middlewares_js_1.errHandler);
