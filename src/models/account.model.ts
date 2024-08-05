import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    userId:{
        type:String,
        unique:true
    },
    type:{
        type:String
    },
    provider:{
        type:String,
        unique:true
    },
    providerAccId:{
        type:String,
        unique:true
    },
    refreshToken:{
        type:String
    },
    accessToken:{
        type:String
    },
    token_type:{
        type:String
    },
    scope:{
        type:String
    },
    id_token:{
        type:String
    },
    session_state:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

export const Account = mongoose.models.accounts || mongoose.model('accounts',AccountSchema)