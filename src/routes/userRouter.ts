import { Router } from "express";
import { UserController } from "../user/user.controller";

export class UserRouter {
    private userController: UserController;
    private router = Router();

    constructor(userController: UserController) {
        this.userController = userController;
        this.userCreateRoute(); 
    }

    private userCreateRoute() {
        this.router.route("/createUser").post(this.userController.createUser);
    }
    
}