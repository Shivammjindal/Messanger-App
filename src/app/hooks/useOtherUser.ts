import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation:any) => {

    const session = useSession()
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email
        const otherUser = conversation.users.filter((user:any) => {
            if(user.email != currentUserEmail){
                return user;
            }
        })
    },[session?.data?.user?.email, conversation.users])

    return otherUser
}

export default useOtherUser