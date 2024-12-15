"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../api/routes"));
const errors_1 = require("../errors");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '../uploads')));
app.use('/users', routes_1.default.users);
app.use((err, req, res, next) => {
    (0, errors_1.errorHandler)(err, req, res, next);
});
exports.default = app;
