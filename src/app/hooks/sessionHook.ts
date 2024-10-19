'use client'
import { useSession } from "next-auth/react";

export const sessionHook = () => {
    const session = useSession()
    return session?.data
}