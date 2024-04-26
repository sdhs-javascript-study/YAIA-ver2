"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
class UserRouter {
    constructor(userController) {
        this.router = (0, express_1.Router)();
        this.userController = userController;
        this.userCreateRoute();
    }
    userCreateRoute() {
        this.router.route("/").get(this.userController.sendUser);
        this.router.route("/createUser").post(this.userController.createUser);
    }
}
exports.UserRouter = UserRouter;
