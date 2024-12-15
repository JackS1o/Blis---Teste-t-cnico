"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./api/app"));
const config_1 = require("./config");
dotenv_1.default.config();
const PORT = process.env.PORT || 3002;
(0, config_1.connectToDatabase)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to the database:\n', error);
    console.log('\nServer initialization failed.');
    process.exit(1);
});
