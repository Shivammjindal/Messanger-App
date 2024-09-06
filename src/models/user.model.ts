import mongoose, { Document } from "mongoose";
import { InferSchemaType } from "mongoose"

export const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    hashedPassword:{
        type:String,
    },
    emailVarified:{
        type:Boolean,
        required:true,
        default:false
    },
    image:{
        type:String,
    },
    conversationsIds:[
        {
            type:String
        }
    ],
    conversations:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"conversations"
        }
    ],
    seenMessagesIds:[
        {
            type:String
        }
    ],
    seenMessages:[
        // reference of message model todo
        {
            type:String
        }
    ],
    accounts:[
        // reference of message schema
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"accounts"
        }
    ],
    messages:[
        //reference of message schema
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"messages"
        }
    ]
},{
    timestamps:true
})

export type UserModelType = InferSchemaType<typeof UserSchema> & Document