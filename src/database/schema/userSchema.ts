import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
         required:true
    },
    roomsEnterd:[mongoose.Schema.Types.ObjectId],
});

export const User = mongoose.model('User',userSchema);

