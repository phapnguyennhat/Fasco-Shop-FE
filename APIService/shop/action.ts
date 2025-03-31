'use server';

import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export async function createShop(file: Blob, name: string) {
	const formData = new FormData();
	formData.append('name', name);
	formData.append('file', file);

	const authCookie = await getAuthCookies();
	const response = await fetcher('brand', {
		method: 'POST',
		credentials: 'include',
		headers: {
			Cookie: authCookie,
		},
		body: formData,
	});
	if (isErrorResponse(response)) {
		return response;
	}
	revalidateTag('brands');
}


export async function deleteShop(id:string) {
    const authCookie = await getAuthCookies()

   const response =await fetcher(`brand/${id}`, {
       method: 'DELETE',
       credentials: 'include',
       headers: {
           Cookie: authCookie,
       },
   });
   if(!isErrorResponse(response)){
       revalidateTag('brands')
    }
    return response
}

export async function updateShop (id: string, name: string, file?: Blob){
    const formData = new FormData()
    formData.append('name', name)
    if(file){
        formData.append('file', file)
    }

    const authCookie= await getAuthCookies()

    const response = await fetcher(`brand/${id}`,{
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        body: formData
    })

    if(isErrorResponse(response)){
        return response

    }
    revalidateTag('brands')
}