"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    roomName: {
        type: String,
        required: true
    },
    keycode: {
        type: String,
        required: true
    },
    parcitipants: [mongoose_1.default.Schema.Types.ObjectId],
}, { timestamps: true });
exports.Room = mongoose_1.default.model('Room', roomSchema);
