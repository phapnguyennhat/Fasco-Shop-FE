'use server'
import getAuthCookies from "@/lib/getAuthCookie";
import { fetcher, isErrorResponse } from "@/lib/utils";
import { UpdateUserData } from "@/schema/user";
import { revalidateTag } from "next/cache";

export const updateProfile = async (updateUserData: UpdateUserData)=>{
        const authCookie = await getAuthCookies()
        const response = await fetcher<IResponse>('user', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: authCookie,
            },
            body: JSON.stringify(updateUserData),
        }); 
        if(isErrorResponse(response)){
            return response
        }
        revalidateTag('profile')
}

export const updateAvatar = async (file: Blob) => {
        const formData = new FormData();
        formData.append('file', file )
    
        const authCookie = await getAuthCookies()
        const response=  await fetcher<IResponse>('user/avatar', {
            method: 'PUT',
            credentials: 'include',
                headers: {
                   
                    Cookie: authCookie,
                },
                body: formData
        })
        if(isErrorResponse(response)){
            return response
        }
        revalidateTag('profile')
}