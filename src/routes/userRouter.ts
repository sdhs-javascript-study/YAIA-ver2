import { Router } from "express";
import { UserController } from "../user/user.controller";

export class UserRouter {
    public userController: UserController;
    public router: Router = Router(); 

    constructor(userController: UserController) {
        this.userController = userController; 
        
        this.userCreateRoute();
    }

    userCreateRoute() {
        this.router.route("/").get(this.userController.sendUser);
        this.router.route("/createUser").post(this.userController.createUser);
    }
}
