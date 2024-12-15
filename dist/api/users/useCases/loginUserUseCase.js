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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserUseCase = void 0;
const client_1 = require("../../../prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../../errors");
const passwordUtils_1 = require("../utils/passwordUtils");
const loginUserUseCase = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new errors_1.AppError('Invalid email or password', 401);
    }
    const isPasswordValid = yield (0, passwordUtils_1.verifyPassword)(password, user.password);
    if (!isPasswordValid) {
        throw new errors_1.AppError('Invalid email or password', 401);
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
});
exports.loginUserUseCase = loginUserUseCase;
