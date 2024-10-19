import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

const getSessions = async () => {
    return await getServerSession(authOptions)
}

export { getSessions }