'use server';

import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export const createCategory = async (name: string) => {
	const authCookie = await getAuthCookies();

	const response = await fetcher('category', {
		method: 'POST',
		credentials: 'include',
		headers: {
			Cookie: authCookie,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	});
	if (isErrorResponse(response)) {
		return response;
	}
	revalidateTag('categories');
};

export const deleteCategory = async(id: string)=>{
    const authCookie = await getAuthCookies()
    const response = await fetcher(`category/${id}`,{
        method:'DELETE',
        headers: {
            Cookie: authCookie
        }
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('categories')
    return response
}


export const  updateCategory  = async(id: string, name: string)=>{
    const authCookie = await getAuthCookies()
    const response = await fetcher(`category/${id}`, {
        method: 'PUT',
        headers: {
            Cookie: authCookie,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    })
    
    if(!isErrorResponse(response)){
        revalidateTag('categories')
    }
    return response
    
}