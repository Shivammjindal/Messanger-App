import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest,NextResponse } from "next/server";
import { Conversation } from "@/models";

export async function POST(request:NextRequest, response:NextResponse){
    try {
        const { user } = await getCurrentUser();
        const { conversationId } = await request.json();

        console.log(conversationId)
    } catch (error) {
        
    }
}