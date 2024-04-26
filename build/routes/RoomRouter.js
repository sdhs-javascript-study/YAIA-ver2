"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
const express_1 = require("express");
class roomRouter {
    constructor(qnaController) {
        this.router = (0, express_1.Router)();
        this.qnaController = qnaController;
        this.roomCreateRoute();
        this.findRoomRoute();
    }
    roomCreateRoute() {
        this.router.route("/createRoom").post(this.qnaController.createRoom);
    }
    findRoomRoute() {
        this.router.route("/").get(this.qnaController.getAllRooms);
    }
}
exports.roomRouter = roomRouter;
