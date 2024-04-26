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
exports.qnaController = void 0;
const qna_service_1 = require("./qna.service");
class qnaController {
    constructor() {
        this.createRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { roomName } = req.body;
                if (!roomName) {
                    res.status(404).json({ "msg": "roomName is Required" });
                }
                else {
                    const newRoom = yield this.qnaService.createRoom(roomName);
                    console.log(newRoom);
                    res.status(200).json({ "msg": "success" });
                }
            }
            catch (error) {
                console.error("Error creating room:", error);
                res.status(500).json({ "error": "Internal server error" });
            }
        });
        this.getAllRooms = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield this.qnaService.getRooms();
                res.status(200).json({ "msg": rooms });
            }
            catch (error) {
                console.error("Error creating room:", error);
                res.status(500).json({ "error": "Internal server error" });
            }
        });
        this.qnaService = new qna_service_1.QnaService();
    }
}
exports.qnaController = qnaController;
