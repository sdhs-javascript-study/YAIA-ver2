import { Message } from "../module/message.module";

export class MessageService{
    private message: Message[] =[];

    addMessage(id:string,userId:string,text:string):Message{
        const message: Message = {id,userId,text};
        this.message.push(message);
        return message;
    }

    getMessage(): Message[]{
        return this.message;
    }
}