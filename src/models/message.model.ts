import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body:{
        type:String
    },
    seenIds:[
        {
            type:String
        }
    ],
    seen:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    conversationId:{
        type:String
    },
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversations"
    },
    senderId:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},
{
    timestamps:true
})