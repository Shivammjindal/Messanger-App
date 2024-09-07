import {NextRequest,NextResponse} from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { Message } from "@/models"
import { Conversation } from "@/models"

export async function POST(request:NextRequest, response:NextResponse){

    try {
        const { user } = await getCurrentUser()
        const currUser = user
        const body = await request.json()

        const {
            message,
            image,
            conversationId
        } = body

        if(!currUser?._id || !currUser.email){
            return new NextResponse('Unauthorised User',{ status:401 })
        }

        const newMessage = await Message.create({
            body:message,
            image:image,
            conversationId:conversationId,
            conversation:conversationId,
            sender: currUser._id,
            senderId: currUser._id,
            seenIds:[currUser._id],
            //the user who sends it imediately seen the message
            seen: [currUser._id]
        })

        await newMessage.populate([
            { path:'seen' },
            { path:'sender' }
        ])

        await Conversation.findByIdAndUpdate({_id:conversationId},{
            lastMessageAt:new Date(),
            $push:{
                message:newMessage._id
            }
        }).populate([
            { path:'users' },
            { path:'message', select:'seen'}
        ])
        
        return NextResponse.json(newMessage)

    } catch (error:any) {
        console.log("Error Occured", error)
        return new NextResponse('internal server error',{status:500})
    }

}