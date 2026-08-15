'use server'

import { headers } from "next/headers"
import { auth } from "../auth"

export const clientId = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user
    return user
    
}