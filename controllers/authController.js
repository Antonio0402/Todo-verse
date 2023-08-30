"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
var utils_js_1 = require("../lib/utils.js");
var todos_database_js_1 = require("../todos/todos.database.js");
var handleLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_email, password, result, user, isValid, accessToken_1, refreshToken, updateRefreshToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_email = _a.user_email, password = _a.password;
                if (!user_email || !password)
                    return [2 /*return*/, res.status(400).json({ "message": "User's email or password are required!" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, (0, todos_database_js_1.query)('SELECT * FROM public.users WHERE user_email = $1', [user_email])];
            case 2:
                result = _b.sent();
                user = result.rows[0];
                if (!user) {
                    return [2 /*return*/, res.status(401).json("User is not found with email: ".concat(user_email))];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.hashed_password)];
            case 3:
                isValid = _b.sent();
                if (!isValid) {
                    return [2 /*return*/, res.status(401).json("Incorrect password")];
                }
                return [4 /*yield*/, (0, utils_js_1.signJwt)({ "sub": user.user_email, role: "user" }, "access", "1h")];
            case 4:
                accessToken_1 = _b.sent();
                return [4 /*yield*/, (0, utils_js_1.signJwt)({ "sub": user.user_email, role: "user" }, "refresh", "1d")];
            case 5:
                refreshToken = _b.sent();
                req.session.regenerate(function (err) {
                    if (err)
                        next(err);
                    // store user information in session, typically a user id
                    req.session.user = { accessToken: accessToken_1 };
                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    req.session.save(function (err) {
                        if (err)
                            return next(err);
                    });
                });
                return [4 /*yield*/, (0, todos_database_js_1.query)("UPDATE public.users SET refresh_token = $1 WHERE user_email = $2 RETURNING *;", [refreshToken, user.user_email])];
            case 6:
                updateRefreshToken = _b.sent();
                if (updateRefreshToken.rows.length) {
                    res.status(200).json("You are authenticated");
                }
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.default = handleLogin;
