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
exports.QnaService = void 0;
const roomeSchema_1 = require("../database/schema/roomeSchema");
const userSchema_1 = require("../database/schema/userSchema");
class QnaService {
    constructor() {
        this.createRoom = (roomName) => __awaiter(this, void 0, void 0, function* () {
            const keycode = Math.round(Math.random() * 10000);
            const newRoom = yield roomeSchema_1.Room.create({
                roomName,
                keycode
            });
            return newRoom;
        });
        this.addUser = (keycode, userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userSchema_1.User.findById(userId);
            if (!user) {
                throw new Error("User does not exist at addUser");
            }
            const AddedUser = yield roomeSchema_1.Room.updateOne({ keycode: keycode }, { $push: { participants: user._id } }, (err, result) => {
                if (err) {
                    throw new Error(`Could not find a room with the providen keycode : ${err}`);
                }
                else {
                    console.log("Update result:", result);
                }
            });
            return AddedUser;
        });
        this.getRooms = () => __awaiter(this, void 0, void 0, function* () {
            const Rooms = yield roomeSchema_1.Room.find({});
            return Rooms;
        });
    }
}
exports.QnaService = QnaService;
