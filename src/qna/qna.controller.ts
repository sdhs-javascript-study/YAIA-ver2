import { Request,Response } from "express";
import { QnaService } from "./qna.service";


export class qnaController{
   private qnaService : QnaService;
    
    constructor(){
        this.qnaService = new QnaService();
    }
    
    createRoom = async(req: Request, res: Response): Promise<void>=> {
        try {
            const { roomName } = req.body;
            if (!roomName){
                res.status(404).json({"msg":"roomName is Required"});
            }else{
                const newRoom = await this.qnaService.createRoom(roomName);
                console.log(newRoom);
                res.status(200).json({ "msg": "success" });
            }
        } catch (error) {
            console.error("Error creating room:", error);
            res.status(500).json({ "error": "Internal server error" });
        }
    }

    getAllRooms = async(req: Request, res: Response): Promise<void>=>{
        try{
            const rooms = await this.qnaService.getRooms();
            res.status(200).json({"msg":rooms});
        }catch(error){
            console.error("Error creating room:", error);
            res.status(500).json({ "error": "Internal server error" });
        }
    }
}