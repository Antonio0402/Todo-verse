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
exports.verifyToken = exports.verifyJwt = exports.signJwt = exports.validPassword = exports.bCryptGenPass = void 0;
var bcrypt_1 = require("bcrypt");
var crypto = require("crypto");
var jose = require("jose");
var dotenv = require("dotenv");
var dotenv_expand_1 = require("dotenv-expand");
dotenv_expand_1.default.expand(dotenv.config());
var saltRounds = 10;
var ALGORITHM = "HS256";
var SECRET_KEY = new TextEncoder().encode('mySecretKey');
var REFRESH_SECRET_KEY = new TextEncoder().encode('myRefreshSecretKey');
if (!(process.env.SERVER_ORIGIN_URL && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables");
}
var CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
var SERVER_ORIGIN_URL = process.env.SERVER_ORIGIN_URL;
function bCryptGenPass(password) {
    var salt = bcrypt_1.default.genSaltSync(saltRounds);
    var hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
}
exports.bCryptGenPass = bCryptGenPass;
function validPassword(password, salt, hash) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return hash === hashVerify;
}
exports.validPassword = validPassword;
var signJwt = function (payload, kindOf, expire) { return __awaiter(void 0, void 0, void 0, function () {
    var PRIV_KEY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                PRIV_KEY = kindOf === "access"
                    ? SECRET_KEY
                    : REFRESH_SECRET_KEY;
                return [4 /*yield*/, new jose.SignJWT(payload)
                        .setProtectedHeader({ alg: ALGORITHM })
                        .setIssuer(SERVER_ORIGIN_URL)
                        .setAudience(CLIENT_ORIGIN_URL)
                        .setIssuedAt()
                        .setExpirationTime(expire)
                        .sign(PRIV_KEY)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.signJwt = signJwt;
var verifyJwt = function (jwt, publicKey) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, jose.jwtVerify(jwt, publicKey, {
                    issuer: SERVER_ORIGIN_URL,
                    audience: CLIENT_ORIGIN_URL,
                    algorithms: [ALGORITHM]
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.verifyJwt = verifyJwt;
var verifyToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, payload, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accessToken = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.accessToken;
                if (!(accessToken && accessToken.match(/\S+\.\S+\.\S+/) !== null)) return [3 /*break*/, 5];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, exports.verifyJwt)(accessToken, SECRET_KEY)];
            case 2:
                payload = (_b.sent()).payload;
                if (payload.sub) {
                    req.user_email = payload === null || payload === void 0 ? void 0 : payload.sub;
                }
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(403).json("Token is not valid!");
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(401).json("You are not authenticated!");
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.verifyToken = verifyToken;
