import { Request,Response } from "express";
import { userService } from "./user.service";
import { SessionData } from "../interface/sessionData";

export class UserController{
    private UserService:userService;

    constructor(){
        this.UserService = new userService();
    }

    createUser = async(req:Request,res:Response):Promise<void> =>{
        try { 
            const {userName} = req.body;
            const session = req.session as unknown as SessionData;
            const newUser = await this.UserService.createUser(userName);
            res.status(200).json({newUser,msg:"User created"});
            session.userName = userName;
            session.isRoomEnterd = false;
            session.userRoom = null;
            console.log(req.session);
        } catch (error) {
            res.status(400).json({msg:"User already exists"});
            console.error("error at user.controller.ts: ",error);
        }
    }

    sendUser = async(req:Request,res:Response):Promise<void> =>{
        try{
            const {userName} = req.body;
            res.status(200).json({"result":await this.UserService.sendUser(userName)});
        }catch(error){
            console.error("error at user.controller.ts: ",error);
            res.status(500);
        }
    }

    addRoom = async(req:Request,res:Response):Promise<void> =>{
        try {
            const {userName,roomId} = req.body;

            const addRoom = await this.UserService.addRoom(userName,roomId);
                                           
           console.log(addRoom);
           res.status(204).json({msg:"sucess"});
        } catch (error) {
            console.error("error at user.controller.ts: ",error);
            res.status(500);
        }
    }

}