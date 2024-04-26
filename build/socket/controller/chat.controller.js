"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChat = void 0;
const user_service_1 = require("../service/user.service");
const message_service_1 = require("../service/message.service");
const initChat = (io) => {
    const userService = new user_service_1.UserService();
    const messageService = new message_service_1.MessageService();
    io.on('connection', (socket) => {
        console.log('a User connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('message', (msg) => {
            console.log(msg);
            io.emit('message', msg);
            const user = userService.getUser(socket.id);
            if (user) {
                const message = messageService.addMessage(Date.now().toString(), user.id, msg);
            }
        });
        socket.on('login', (username) => {
            userService.addUser(socket.id, username);
            io.emit('userList', userService.getUser(username));
        });
    });
};
exports.initChat = initChat;
