import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models";

export const POST = async (request:NextRequest, response:NextResponse) => {

    try {

        const { id,image,name } = await request.json()
        console.log("Credentials : ",id,image,name);

        if(!id || (!image && !name)){
            return new NextResponse('invalid credentials',{ status:404 })
        }
        
        const newUser = await User.findOneAndUpdate({_id:id }, {
            name : name,
            image : image
        },{returnDocument:"after"})

        console.log(newUser)

        return NextResponse.json(newUser)

    } catch (error) {
        return new NextResponse('internal server error',{ status:500 })
    }
}