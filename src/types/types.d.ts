import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Profile{
        _id?:String,
        id?:String,
        name?:String,
        url?:String,
        sub?:String,
        email?:String,
        image?:String,
    }
}