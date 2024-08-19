// "use client"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
// // import { useSession } from "next-auth/react"
// import { useSession } from "next-auth/react"

// export default function GetSessions(){
//     const session = useSession()
//     console.log(session)
    
// }

const getSessions = async () => {
    return await getServerSession(authOptions)
}

export { getSessions }