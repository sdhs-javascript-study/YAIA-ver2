import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export class DB{
    DB_URL: string;
    static DB_URL: string;
    constructor(DB_URL:string){
        this.DB_URL = DB_URL;
    }

    
     connect = async (): Promise<string> => {
        try {
            await mongoose.connect(this.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
            }as any);
            console.log("MongoDB database connection successfully established");
            return "Connected to database";
        } catch (error) {
            throw new Error(`Error at DB class connect() function: ${error}`);
        }
    };
}