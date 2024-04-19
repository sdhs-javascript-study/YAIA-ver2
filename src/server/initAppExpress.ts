
import express, { Express, RequestHandler } from "express";
import { DB } from "../database/connection";
import dotenv from "dotenv";
import http from "http";
import { OpenSocketServer } from "./socke.io.server";
import { UserController } from "../user/user.controller";
import { UserRouter } from "../routes/userRouter";
import { roomRouter } from "../routes/RoomRouter";
import { qnaController } from "../qna/qna.controller";
import session from "express-session";
dotenv.config();

export const initAppExpress = (app: Express): void => {
    try {
        app.use(express.urlencoded({extended : false}));
        app.use(express.json());

        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("DB_URL is not defined in the environment variables.");
        }

        const db = new DB(dbURL);
        db.connect();

        const server = http.createServer(app);
        OpenSocketServer(server);

        if (!process.env.SESSION_SECRET) {
            throw new Error("SESSION_SECRET environment variable is not defined");
        }
        
        const sessionSecret: string = process.env.SESSION_SECRET;
        
        app.use(
            session({
                secret: sessionSecret,
                resave: false,
                saveUninitialized: false,
            })
        );

        const userController = new UserController();
        const userRouter = new UserRouter(userController);
        app.use("/user", userRouter.router);

        const roomController = new qnaController();
        const rmRouter = new roomRouter(roomController)
        app.use("/room",rmRouter.router);
        
        // app.use('/socket.io', express.static(path.join(__dirname, '../node_modules/socket.io/client-dist')));
    } catch (error) {
        throw new Error(`error at initAppExpress.ts: ${error}`);
    }
}

