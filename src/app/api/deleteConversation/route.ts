import { NextRequest, NextResponse } from "next/server"
import { Conversation } from "@/models"

export async function POST(request:NextRequest, response:NextResponse) {
    try {   
        const { conversationId } = await request.json();

        if(!conversationId){
            return new NextResponse('Invalid Data',{ status: 400})
        }
        await Conversation.findOneAndDelete({
            _id: conversationId
        })

        return NextResponse.json({message:'conversation deleted successfully'})
    } catch (error) {
        return new NextResponse('Internal Server Error',{status:500})
    }
}