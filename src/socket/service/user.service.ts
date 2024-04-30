import { QnaService } from "../../qna/qna.service";
import { User } from "../module/user.module";

export class UserService extends QnaService   {
    private userMsgs:[{}] = [{}];
    // addUser(username:string):User{
    //     const user:User = {username};
    //     this.users.push(user);
    //     return user;
    // }



    getMessege(message:string,userName:string):string|boolean{
        let returnValue:boolean|null = null;
        if(!userName) return false;

        if(!message) return false;
    
        this.userMsgs.push({"userName":userName,"message":message});
        return "success";
    }
};