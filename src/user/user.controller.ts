import { Request,Response } from "express";
import { userService } from "./user.service";
import { Express } from "express";
export class UserController{
    private UserService:userService;

    constructor(){
        this.UserService = new userService();
    }

    createUser = async(req:Request,res:Response):Promise<void> =>{
        try {
            const {userName,} = req.body;
            const newUser = await this.UserService.createUser(userName);
            res.status(200).json({newUser,msg:"User created"});
            (req.session as Express.Session).userName = userName;
        } catch (error) {
            res.status(400).json({msg:"User already exists"});
            console.error("error at user.controller.ts: ",error);
        }
    }

    sendUser = (req:Request,res:Response):void =>{
        try{
            res.status(200).json({"result":this.UserService.sendUser()});
        }catch(error){
            console.error("error at user.controller.ts: ",error);
        }
    }

    addRoom = (req:Request,res:Response):void =>{
        try {


        } catch (error) {
            console.error("error at user.controller.ts: ",error);
        }
    }

}