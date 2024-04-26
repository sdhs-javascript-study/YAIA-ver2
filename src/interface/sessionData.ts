import { Cookie } from "express-session";

export interface SessionData {
    cookie:Cookie;
    userName: string,
    isRoomEnterd: boolean,
    userRoom: string | null 
};