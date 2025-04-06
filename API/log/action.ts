'use server'
import getAuthCookies from "@/lib/getAuthCookie"
import { revalidateTag } from "next/cache"

import { fetcher, isErrorResponse } from "@/lib/utils"

 



export const updateLog = async (logId: string, updateLogDto: UpdateLogDto) => {
    const authCookie = await getAuthCookies()
    const response = await fetcher<IResponse>(`log/${logId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie
        },
        body: JSON.stringify(updateLogDto)
    })
    if (isErrorResponse(response)) {
        return response
    }


    return response 
}
