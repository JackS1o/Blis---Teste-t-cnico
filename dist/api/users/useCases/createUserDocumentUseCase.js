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
exports.createUserDocumentUseCase = void 0;
const client_1 = require("../../../prisma/client");
const errors_1 = require("../../../errors");
const createUserDocumentUseCase = (userId, name, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = yield client_1.prisma.userDocuments.create({
            data: {
                user_id: userId,
                name,
                url: filePath,
            },
        });
        return document;
    }
    catch (error) {
        throw new errors_1.AppError('Failed to create document', 500);
    }
});
exports.createUserDocumentUseCase = createUserDocumentUseCase;
