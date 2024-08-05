import mongoose from "mongoose";

const ConversationSchama = new mongoose.Schema({
    lastMessageAt:{
        type:Date
    },
    name:{
        type:String
    },
    messageIds:[
        {
            type:String
        }
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ],
    userIds:[
        {
            type:String
        }
    ],
    users:[
        {
            type:String
        }
    ]

},{
    timestamps:true
})

export const Conversation = mongoose.models.conversations || mongoose.model('conversations',ConversationSchama)