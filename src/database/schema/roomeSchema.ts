import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName:{
        type:String,
        required: true
    },
    keycode:{
        type:String,
        required:true
    },
    
    parcitipants:[mongoose.Schema.Types.ObjectId],


},{timestamps:true});


export const Room = mongoose.model('Room',roomSchema);