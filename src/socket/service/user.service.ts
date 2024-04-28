import { userService } from "../../user/user.service";
import { User } from "../module/user.module";

export class UserService extends userService  {
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