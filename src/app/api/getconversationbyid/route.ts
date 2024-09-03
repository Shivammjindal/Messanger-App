import { NextRequest,NextResponse } from "next/server";
import { Conversation } from "@/models/conversation.model";

export async function POST(request:NextRequest, response:NextResponse){


    try { 
        const { conversationId } = await request.json();

        if(!conversationId){
            new NextResponse('Invalid Data',{status:400})
        }

        const conversation = await Conversation.findOne({ _id: conversationId })
        .populate({
            path:'users',
        })

        return NextResponse.json(conversation)
    } catch (error:any) {
        return new NextResponse(error,{status:500})
    }
}