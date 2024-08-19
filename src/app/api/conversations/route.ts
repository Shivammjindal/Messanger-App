import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextRequest,NextResponse } from "next/server"
import { Conversation } from "@/models/conversation.model"

export async function POST(request:NextRequest, response:NextResponse){
    try {
        const currUser = await getCurrentUser()
        const body = await request.json()
        const {
            userId,
            isGroup,
            members,
            name
        } = body

        if(!currUser?.id && !currUser?.email){
            return new NextResponse('Unauthorised User',{status:401})
        }

        if(isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse('Invalid Data', {status:400})
        }

        console.log(members);
        
        if(isGroup){
            const newConversation = await Conversation.create({
                name,
                isGroup,
                users:[
                    
                ]
            })
        }

    } catch (error) {
        return new NextResponse('Internal Server Error',{status:500})
    }
}