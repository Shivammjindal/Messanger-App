import getCurrentUser from "@/app/actions/getCurrentUser";
import { Conversation, Message } from "@/models";
import { NextRequest,NextResponse } from "next/server";
import { FullConversationType } from "@/types/model-types";

interface IParams{
    conversationId?:string
}

export async function POST(request:NextRequest,{ params } : { params: IParams }, response:NextResponse){
    try {

        const { user } = await getCurrentUser()
        const currentUser = user
        const { conversationId } = params

        console.log("Current User ",currentUser._id)

        if(!currentUser?.email){
            return new NextResponse('Unauthorized',{ status:401 })
        }

        if(!conversationId){
            return new NextResponse('Invalid Conversation Id',{ status:400 })
        }

        const conversations = await Conversation.find({_id:conversationId}).populate({path:'message'}).populate({path:'users'})

        const conversation:FullConversationType = conversations[0]

        if(!conversation){
            return new NextResponse('Invalid Credentials',{ status:400 })
        }

        //find last message
        const lastMessage = conversation.message[conversation.message.length-1]

        if(!lastMessage){
            return NextResponse.json(conversation);
        }

        let check = false;

        for(let i = 0; i < lastMessage.seenIds.length; i++){
            if(lastMessage.seenIds[i] === currentUser._id){
                check = true;
            }
        }

        // console.log('Check',check)
        

        if(check){
            return NextResponse.json({msg:'Already Seen The Messages'})
        }

        // update seen of last message
        const updateMessage = await Message.findOneAndUpdate({
            _id:lastMessage._id
        },{
            $push:{
                seen:currentUser._id,
                seenIds:currentUser._id
            }
        })

        return NextResponse.json(conversation)
    } catch (error) {
        console.log("E:/",error)
        return new NextResponse('Intersal Server Error in Seen Route', { status:500 })
    }
}