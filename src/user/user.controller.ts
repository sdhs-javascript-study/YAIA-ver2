import { Request,Response } from "express";
import { userService } from "./user.service";

export class UserController{
    private UserService:userService;

    constructor(){
        this.UserService = new userService();
    }

    createUser = (req:Request,res:Response):void =>{
        try {
            const {userName,roomId} = req.body;
            this.UserService.createUser(userName,roomId);
            res.status(200).json({msg:"User created"});
        } catch (error) {
            console.error("error at user.controller.ts: ",error);
        }
    }
}