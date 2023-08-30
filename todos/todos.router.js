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
var express_1 = require("express");
var todos_service_js_1 = require("./todos.service.js");
var todosRouter = express_1.default.Router();
//* CREATE TODO
todosRouter.post("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_email, _a, title, progress, date, todo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_email = req.user_email;
                _a = req.body, title = _a.title, progress = _a.progress, date = _a.date;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, todos_service_js_1.createTodo)(title, progress, date, user_email)];
            case 2:
                todo = _b.sent();
                if (todo) {
                    res.status(200).json(todo);
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//* GET ALL TODO  
todosRouter.get("/:userEmail", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, todo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userEmail = req.params.userEmail;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, todos_service_js_1.getAllTodos)(userEmail)];
            case 2:
                todo = _a.sent();
                if (todo.length) {
                    return [2 /*return*/, res.status(200).json(todo)];
                }
                return [2 /*return*/, res.status(204).json("No todos found!")];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//* EDIT A TODO
todosRouter.put("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_email, id, _a, title, progress, date, todo, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_email = req.user_email;
                id = req.params.id;
                _a = req.body, title = _a.title, progress = _a.progress, date = _a.date;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, todos_service_js_1.updateTodo)(title, progress, date, parseInt(id), user_email)];
            case 2:
                todo = _b.sent();
                if (todo) {
                    res.status(200).json(todo);
                }
                else {
                    res.status(204).json("No todo found!");
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//* DELETE TODO
todosRouter.delete("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_email, id, todo, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_email = req.user_email;
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'Todo ID is required' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, todos_service_js_1.deleteTodo)(parseInt(id), user_email)];
            case 2:
                todo = _a.sent();
                if (todo) {
                    res.status(200).json(todo);
                }
                else {
                    res.status(403).json('You are only able to delete your own todo');
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = todosRouter;
