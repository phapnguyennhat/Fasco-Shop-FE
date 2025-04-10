'use server'

import getAuthCookies from "@/lib/getAuthCookie"
import { fetcher } from "@/lib/utils"

export const genUrlMomo = async (orderId: string, amount: number) => {
    const  authCookie = await getAuthCookies()
    const respones = await fetcher<{payUrl: string}>('momo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie
        },
        body: JSON.stringify({
            orderId,
            amount
        })
    })
    return respones
}
