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
exports.createUserDocument = exports.login = exports.createUser = void 0;
const createUserUseCase_1 = require("../useCases/createUserUseCase");
const loginUserUseCase_1 = require("../useCases/loginUserUseCase");
const createUserDocumentUseCase_1 = require("../useCases/createUserDocumentUseCase");
const errors_1 = require("../../../errors");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, password } = req.body;
    const result = yield (0, createUserUseCase_1.createUserUseCase)(name, birthdate, email, password);
    res.status(201).json(result);
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { token, user } = yield (0, loginUserUseCase_1.loginUserUseCase)(email, password);
    res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, name: user.name },
    });
});
exports.login = login;
const createUserDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new errors_1.AppError('User not authenticated', 401);
    }
    if (!req.file) {
        throw new errors_1.AppError('File is required', 400);
    }
    const filePath = `/uploads/${req.file.filename}`;
    const document = yield (0, createUserDocumentUseCase_1.createUserDocumentUseCase)(userId, name, filePath);
    res.status(201).json({
        message: 'Document created successfully',
        document,
    });
});
exports.createUserDocument = createUserDocument;
