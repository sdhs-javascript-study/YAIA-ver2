import { Server as HttpServer } from "http";
import { initChat } from "../socket/controller/chat.controller";
import { Server } from "socket.io";

export const OpenSocketServer = (server:HttpServer): void =>{
    server.listen(3002,()=>{
        console.log('Socket IO server listening on port',3001);
    })

    const io = new Server(server,{
        cors:{
            origin: "*",
        }
    });

    initChat(io)
}