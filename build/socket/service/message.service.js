"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
class MessageService {
    constructor() {
        this.message = [];
    }
    addMessage(id, userId, text) {
        const message = { id, userId, text };
        this.message.push(message);
        return message;
    }
    getMessage() {
        return this.message;
    }
}
exports.MessageService = MessageService;
