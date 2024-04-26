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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName } = req.body;
                const session = req.session;
                const newUser = yield this.UserService.createUser(userName);
                res.status(200).json({ newUser, msg: "User created" });
                session.userName = userName;
                session.isRoomEnterd = false;
                session.userRoom = null;
                console.log(req.session);
            }
            catch (error) {
                res.status(400).json({ msg: "User already exists" });
                console.error("error at user.controller.ts: ", error);
            }
        });
        this.sendUser = (req, res) => {
            try {
                res.status(200).json({ "result": this.UserService.sendUser() });
            }
            catch (error) {
                console.error("error at user.controller.ts: ", error);
            }
        };
        this.addRoom = (req, res) => {
            try {
            }
            catch (error) {
                console.error("error at user.controller.ts: ", error);
            }
        };
        this.UserService = new user_service_1.userService();
    }
}
exports.UserController = UserController;
