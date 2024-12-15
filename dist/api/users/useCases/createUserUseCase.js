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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUseCase = void 0;
const client_1 = require("../../../prisma/client");
const passwordUtils_1 = require("../utils/passwordUtils");
const errors_1 = require("../../../errors");
const createUserUseCase = (name, birthdate, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield client_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userExists) {
        throw new errors_1.AppError('User already exists', 409);
    }
    const hashedPassword = yield (0, passwordUtils_1.hashPassword)(password);
    const user = yield client_1.prisma.user.create({
        data: {
            name,
            birthdate,
            email,
            password: hashedPassword,
        },
    });
    return user;
});
exports.createUserUseCase = createUserUseCase;
