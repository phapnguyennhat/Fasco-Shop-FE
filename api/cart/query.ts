import { TIME_CACHE } from '@/app/common/constant';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';

export const getCart = async () => {
	try {
		const authCookie = await getAuthCookies();
		if (!authCookie) {
			return [];
		}
		const cartItems = await fetcher<ICartItem[]>('cart', {
			method: 'GET',
			headers: {
				Cookie: authCookie,
			},
			credentials: 'include',
			next: {
				revalidate: TIME_CACHE,
				tags: ['cartItem'],
			},
		});
		if (isErrorResponse(cartItems)) {
			return [];
		}
		return cartItems;
	} catch (error) {
		return [];
	}
};
