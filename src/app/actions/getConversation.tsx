import { ConversationModelType } from "@/models/conversation.model"
import getCurrentUser from "./getCurrentUser"
import { UserModelType } from "@/models/user.model"
import axios from "axios"
import { FullConversationType } from "@/types/model-types"

interface getConversationConversationProps{
    data:FullConversationType[]
}

const getConversation = async () => {

    const { user } = await getCurrentUser()
    const { data }:getConversationConversationProps = await axios.post('http://localhost:3000/api/getconversations',{userId:user._id})

    return data
}

export { getConversation }