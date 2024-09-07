import { Message } from "@/models";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest ,response:NextResponse){

    try {
        const {
            conversationId
        } = await request.json()



        console.log("Conversation ID : ", conversationId)
        
        if(!conversationId){
            return new NextResponse('Invalid conversation id',{status:400});
        }

        const messages = await Message.find({
            conversationId
        })
        .populate('sender')
        .sort(
            //newest one at first
            {createdAt:1}
        )

        console.log("Running...")
        
        return NextResponse.json({messages})
    } catch (error) {
        return new NextResponse('Internal Server Error',{status:500})
    }
    
}