"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const userValidation_1 = require("../utils/userValidation");
const response_1 = require("../../../services/response");
const validation_1 = require("../../middlewares/validation");
const router = express_1.default.Router();
router.post('/', (0, validation_1.validate)(userValidation_1.createUserValidationSchema), (0, response_1.wrapHandler)(controllers_1.createUser));
exports.default = router;
