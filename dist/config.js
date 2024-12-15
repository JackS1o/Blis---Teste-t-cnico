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
exports.connectToDatabase = connectToDatabase;
const promise_1 = __importDefault(require("mysql2/promise"));
// Aqui estamos utilizando o nome do serviço como hostname
const connectionConfig = {
    host: 'mysql', // Nome do serviço no docker-compose.yml
    user: 'root',
    password: 'password', // Ou o que você estiver usando para o root
    database: 'meubanco',
    port: 3306,
};
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield promise_1.default.createConnection(connectionConfig);
            console.log('Connected to the database!');
            return connection;
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            throw error; // Rethrow to be handled at a higher level
        }
    });
}
