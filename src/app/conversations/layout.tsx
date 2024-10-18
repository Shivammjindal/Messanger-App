import Sidebar from "../users/components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"
import { getConversation } from "../actions/getConversation"
import { getAllUsers } from "../actions/getUsers"
import { InputList } from "./components/InputList"
import { UserModelType } from "@/models/user.model"

interface LayoutProps{
    children:React.ReactNode
}

const ConversationLayout:React.FC<LayoutProps> = async ({children}) => {

    const conversations = await getConversation()
    const { users } : { users: UserModelType[] } = await getAllUsers()

    return(
        <Sidebar>
            <div className="h-full w-screen lg:w-full">
                <ConversationList initialItems={conversations} users={users}/>
                {children}
                <div className="fixed left-96 top-96">
                </div>
            </div>
        </Sidebar>
    )
}

export default ConversationLayout