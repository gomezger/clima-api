"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const App_1 = require("./src/App");
dotenv_1.default.config();
const port = process.env.PORT;
const app = new App_1.App();
app.getExpressApp().listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
