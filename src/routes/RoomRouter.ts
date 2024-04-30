import { Router } from "express";
import { qnaController } from "../qna/qna.controller";

export class roomRouter{
  private  qnaController:qnaController;
  public router: Router = Router();

    constructor(qnaController:qnaController){
        this.qnaController =  qnaController;

        this.roomCreateRoute();
        this.findRoomRoute();
        this.RoomusersRoute();
    }

    public  roomCreateRoute(){
        this.router.route("/createRoom").post(this.qnaController.createRoom);
    }

    public findRoomRoute(){
        this.router.route("/").get(this.qnaController.getAllRooms);
    }
    
    public RoomusersRoute(){
        this.router.route("/getUsers").get(this.qnaController.getAllUsers);
    }


}