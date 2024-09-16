"use client"

import useConversation from "../hooks/useConversation"
import EmptySpace from "../users/components/EmptySpace"
import clsx from "clsx"


const Home = () => {

    const { isOpen } = useConversation()

    return (
        <div
            className={clsx(
                    "lg:pl-80 h-full lg:block",
                    isOpen ? 'block' : 'hidden'
                )}
        >
            <EmptySpace/>
        </div>
    )

}

export default Home