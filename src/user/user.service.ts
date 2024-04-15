import { User } from "../database/schema/userSchema";

export class userService{
    createUser = async(name:string,roomId:string):Promise<object> =>{
        const userExists = await User.exists({name});

        if(userExists) throw new Error("name already taken");
        const user = await User.create({name});

        return {user,msg:"User successfully created"};  
    } 
}
