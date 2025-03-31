'use server';

import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export const createFavorite = async (productId: string) => {
	const authCookie = await getAuthCookies();
	const response = await fetcher<IResponse>(`user/favorite/${productId}`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			Cookie: authCookie,
		},
	});
	if (isErrorResponse(response)) {
		return response;
	}
	revalidateTag(`productDetail/${productId}`);
	revalidateTag('favoriteProducts');
};

export const deleteFavoriteAbulk = async (productIds: string[]) => {
	const authCookie = await getAuthCookies();
	const response = await fetcher<IResponse>('user/favorite', {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: authCookie,
		},
		body: JSON.stringify({ productIds }),
	});
	if (isErrorResponse(response)) {
		return response;
	}

	productIds.forEach((productId) => {
		revalidateTag(`productDetail/${productId}`);
	});
	revalidateTag('favoriteProducts');
};
