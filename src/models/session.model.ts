import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema(
    {
        id:{
            type:String,
        },
        sessionToken:{
            type:String
        },
        userId:{
            type:String
        }
    },
    { timestamps:true }
)

export const Session = mongoose.models.sessions || mongoose.model('sessions',sessionSchema)