"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSuccess = exports.loginFailure = void 0;
var loginFailure = function (_req, res, _next) {
    res.status(401).json({
        success: false,
        message: "Your password or username are incorrect. Please check again"
    });
};
exports.loginFailure = loginFailure;
var loginSuccess = function (req, res, _next) {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "You are authenticated",
            user: req.user
        });
    }
    else {
        res.status(401).json({
            success: false,
            message: "You are not authenticated",
        });
    }
};
exports.loginSuccess = loginSuccess;
