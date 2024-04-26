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
exports.userService = void 0;
const roomeSchema_1 = require("../database/schema/roomeSchema");
const userSchema_1 = require("../database/schema/userSchema");
class userService {
    constructor() {
        this.createUser = (name) => __awaiter(this, void 0, void 0, function* () {
            const userExists = yield userSchema_1.User.exists({ userName: name });
            if (userExists)
                throw new Error("name already taken");
            const user = yield userSchema_1.User.create({ userName: name });
            console.log(user);
            return user;
        });
        this.sendUser = () => __awaiter(this, void 0, void 0, function* () {
            const users = { j: "jjj" };
            return users;
        });
        this.addRoom = (name, roomId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield userSchema_1.User.findOneAndUpdate({ userName: name }, { $push: { roomsEnterd: roomId } });
                const newRoom = yield roomeSchema_1.Room.findOneAndUpdate({ keycode: roomId }, { $push: { parcitipants: newUser === null || newUser === void 0 ? void 0 : newUser._id } });
                if (!newUser) {
                    throw new Error("Could not find user");
                }
                if (!newRoom) {
                    throw new Error("Could not find room");
                }
                return { newUser, newRoom };
            }
            catch (error) {
                throw new Error(`Error adding room: ${error.message}`);
            }
        });
    }
}
exports.userService = userService;
