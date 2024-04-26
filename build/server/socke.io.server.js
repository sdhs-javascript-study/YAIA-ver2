"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSocketServer = void 0;
const chat_controller_1 = require("../socket/controller/chat.controller");
const socket_io_1 = require("socket.io");
const OpenSocketServer = (server) => {
    server.listen(3001, () => {
        console.log('Socket IO server listening on port', 3001);
    });
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        }
    });
    (0, chat_controller_1.initChat)(io);
};
exports.OpenSocketServer = OpenSocketServer;
