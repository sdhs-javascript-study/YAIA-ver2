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
            io.emit('message',msg);
            const user = userService.getUser(socket.id);
            if(user){
                const message = messageService.addMessage(Date.now().toString(),user.id,msg);
            }
        })

        socket.on('login',(username:string)=>{
            userService.addUser(socket.id,username);
            io.emit('userList',userService.getUser(username));
        })
    })
}