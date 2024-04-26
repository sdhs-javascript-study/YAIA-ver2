"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppExpress = void 0;
const express_1 = __importDefault(require("express"));
const connection_1 = require("../database/connection");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socke_io_server_1 = require("./socke.io.server");
const user_controller_1 = require("../user/user.controller");
const userRouter_1 = require("../routes/userRouter");
const RoomRouter_1 = require("../routes/RoomRouter");
const qna_controller_1 = require("../qna/qna.controller");
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const initAppExpress = (app) => {
    try {
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(express_1.default.json());
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("DB_URL is not defined in the environment variables.");
        }
        const db = new connection_1.DB(dbURL);
        db.connect();
        const server = http_1.default.createServer(app);
        (0, socke_io_server_1.OpenSocketServer)(server);
        if (!process.env.SESSION_SECRET) {
            throw new Error("SESSION_SECRET environment variable is not defined");
        }
        const sessionSecret = process.env.SESSION_SECRET;
        app.use((0, express_session_1.default)({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
        }));
        const userController = new user_controller_1.UserController();
        const userRouter = new userRouter_1.UserRouter(userController);
        app.use("/user", userRouter.router);
        const roomController = new qna_controller_1.qnaController();
        const rmRouter = new RoomRouter_1.roomRouter(roomController);
        app.use("/room", rmRouter.router);
        // app.use('/socket.io', express.static(path.join(__dirname, '../node_modules/socket.io/client-dist')));
    }
    catch (error) {
        throw new Error(`error at initAppExpress.ts: ${error}`);
    }
};
exports.initAppExpress = initAppExpress;
