"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.createUserValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const emailValidation = joi_1.default.string().email().required().messages({
    'string.email': 'O e-mail precisa ser válido.',
    'string.empty': 'O e-mail é obrigatório.',
});
const passwordValidation = joi_1.default.string().min(6).required().messages({
    'string.min': 'A senha precisa ter pelo menos 6 caracteres.',
    'string.empty': 'A senha é obrigatória.',
});
exports.createUserValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'string.empty': 'O nome é obrigatório.',
    }),
    email: emailValidation,
    password: passwordValidation,
});
exports.loginValidationSchema = joi_1.default.object({
    email: emailValidation,
    password: passwordValidation,
});
