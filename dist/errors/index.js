"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 400, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details || null,
        });
    }
    else {
        console.error('Unexpected error:', err);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
exports.errorHandler = errorHandler;
