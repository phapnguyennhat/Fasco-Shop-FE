'use server';

import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export const addCart = async (formData: FormData) => {
	const quantity = formData.get('quantity');
	const varientId = formData.get('varientId');
	const authCookie = await getAuthCookies();

	const response = await fetcher<IResponse>('cart', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: authCookie,
		},

		body: JSON.stringify({ quantity, varientId }),
	});
	if (!isErrorResponse(response)) {
		revalidateTag('cartItem');
	}
	return response;
};



export const updateCartItem = async (id: string, quantity: number) => {
	const authCookie = await getAuthCookies();

	await fetcher(`cart/${id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: authCookie,
		},

		body: JSON.stringify({ quantity }),
	});
	revalidateTag('cartItem');
};

export const  deleteCartItem = async(id: string)=> {
    const authCookie = await getAuthCookies();
    await fetcher(`cart/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
    });
    revalidateTag('cartItem');
}

export const revalidateCart = async()=> {
    revalidateTag('cartItem');
}
