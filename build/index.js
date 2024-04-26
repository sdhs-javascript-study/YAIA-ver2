"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const initAppExpress_1 = require("./server/initAppExpress");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    (0, initAppExpress_1.initAppExpress)(app);
    console.log('==========================================================================');
    console.log(`                    server is running on port: ${port}`);
    console.log('==========================================================================');
});
