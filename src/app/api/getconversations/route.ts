import { Conversation } from "@/models"
import { NextRequest,NextResponse } from "next/server"

export async function POST(request:NextRequest, response:NextResponse){
    try {
        const {userId} = await request.json()

        if(!userId){
            return new NextResponse('Invalid Inputs', {status:400})
        }

        const conversation = await Conversation.find({
            userIds:userId
        })
        .sort({lastMessageAt:-1})
        .populate({
            path:'users'
        })
        .populate({
            path:'message',
        })

        return NextResponse.json(conversation)

    } catch (error) {
        console.log(error)
        return NextResponse.json({err:error, status:500})
    }
}