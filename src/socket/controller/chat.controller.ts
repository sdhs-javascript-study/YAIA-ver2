import {Server,Socket} from "socket.io";
import { UserService } from "../service/user.service";
import { MessageService } from "../service/message.service";

export const initChat = (io:Server) =>{
    const userService = new UserService();
    const messageService = new MessageService();
    
    io.on('connection',(socket:Socket)=>{
        console.log('a User connected');

        socket.on('disconnect',()=>{
            console.log('user disconnected');
        });

        socket.on('message',(msg:string)=>{
            console.log(msg);            
            // if(user){
            //     const message = messageService.addMessage(Date.now().toString(),user.username,msg);
                io.emit('message',msg);
            // }
        })
        
        socket.on('login',async(data)=>{
            userService.setUser(data.keycode);

            await userService.addUser(data.keycode,data.username); 
            console.log("user Loged in");
        })
    })
}