"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    // isOperational: boolean;
    constructor(message, statusCode, data = {}) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
        this.data = data;
        // this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
