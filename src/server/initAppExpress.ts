
import express, { Express, RequestHandler } from "express";
import { DB } from "../database/connection";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { initChat } from "../socket/controller/chat.controller";
import http from "http";
import path from "path";
import { OpenSocketServer } from "./socke.io.server";
import { UserController } from "../user/user.controller";
import { UserRouter } from "../routes/userRouter";
dotenv.config();

export const initAppExpress = (app: Express): void => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("DB_URL is not defined in the environment variables.");
        }
        const db = new DB(dbURL);
        db.connect();

        const server = http.createServer(app);
        OpenSocketServer(server);
        
        const userController = new UserController();
        const userRouter = new UserRouter(userController);

        
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use("/user", userRouter.router);
        // app.use('/socket.io', express.static(path.join(__dirname, '../node_modules/socket.io/client-dist')));
    } catch (error) {
        throw new Error(`error at initAppExpress.ts: ${error}`);
    }
}

