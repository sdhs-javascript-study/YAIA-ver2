import { QnaService } from "../../qna/qna.service";
import { User } from "../module/user.module";

export class UserService extends QnaService   {
    private userMsgs:[{}] = [{}];
    public LogedInUsers: string[] = [];

    
    setUser = async(roomId:string):Promise<boolean> =>{
        const ids = await this.getAllUserId(roomId);
        this.LogedInUsers = ids;
        return true;
    }   




    getMessege = (message:string,userName:string):string|boolean=>{
        let returnValue:boolean|null = null;
        if(!userName) return false;

        if(!message) return false;
    
        this.userMsgs.push({"userName":userName,"message":message});
        return "success";
    }
};