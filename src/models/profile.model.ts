import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        image:{
            type:String,
        },
        name:{
            type:String,
        },
        email:{
            type:String,
        },
        sub:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

export const Profile = mongoose.models.profiles || mongoose.model('profiles', profileSchema)