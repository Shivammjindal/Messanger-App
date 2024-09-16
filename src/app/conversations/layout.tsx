import Sidebar from "../users/components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"
import { getConversation } from "../actions/getConversation"

interface LayoutProps{
    children:React.ReactNode
}

const ConversationLayout:React.FC<LayoutProps> = async ({children}) => {

    const conversations = await getConversation()

    return(
        <Sidebar>
            <div className="h-full w-screen lg:w-full">
                <ConversationList initialItems={conversations}/>
                {children}
            </div>
        </Sidebar>
    )
}

export default ConversationLayout