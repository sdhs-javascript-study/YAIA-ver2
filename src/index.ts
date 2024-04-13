import express from "express";
import dotenv from "dotenv";
import { initAppExpress } from "./server/initAppExpress";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    initAppExpress(app);
    console.log('==========================================================================');
    console.log(`                    server is running on port: ${port}`);
    console.log('==========================================================================');
});

