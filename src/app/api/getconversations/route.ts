import { pusherServer } from "@/app/libs/pusher"
import { Conversation } from "@/models"
import { FullConversationType } from "@/types/model-types"
import { NextRequest,NextResponse } from "next/server"

export async function POST(request:NextRequest, response:NextResponse){
    try {
        const {userId} = await request.json()

        console.log("User Id : ", userId)

        if(!userId){
            return new NextResponse('Invalid Inputs', {status:400})
        }

        const conversation:FullConversationType[] = await Conversation.find({
            userIds:userId
        })
        .sort({lastMessageAt:-1})
        .populate({
            path:'users'
        })
        .populate({
            path:'message',
        })

        // let sender:string[] = []

        // conversation.map((conversation) => {
        //     conversation.users.map((user) => {
        //         if(sender.indexOf(user.email) === -1){
        //             sender.push(user.email)
        //         }
        //     })
        // })

        // if(email){
        //     await pusherServer.trigger(email,'new:conversation:align',sender)
        // }
        
        return NextResponse.json(conversation)

    } catch (error) {
        console.log(error)
        return NextResponse.json({err:error, status:500})
    }
}