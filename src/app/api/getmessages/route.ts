import { Message } from "@/models";
import { NextRequest,NextResponse } from "next/server";

interface jsonProps{
    conversationId:string
}

export async function POST(request:NextRequest ,response:NextResponse){

    try {
        const {
            conversationId
        }:jsonProps = await request.json()
        
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
        
        return NextResponse.json({messages})
    } catch (error) {
        return new NextResponse('Internal Server Error',{status:500})
    }
    
}