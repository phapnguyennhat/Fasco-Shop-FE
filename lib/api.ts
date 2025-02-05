import { FIVEMINUTES } from '@/app/common/constant';
import getAuthCookies from './getAuthCookie';
import { fetcher } from './utils';

export async function getProfile() {
    try {
        const authCookie = await getAuthCookies();
        const profile = await fetcher<User>('user/profile', {
            method: 'GET',
            headers: {
                Cookie: authCookie,
            },
            credentials: 'include',
            next: {
                revalidate: FIVEMINUTES,
            },
        });
        return profile;
    } catch (error) {
        return undefined;
    }
}

export async function getCart() {
    try {
        const authCookie = await getAuthCookies();
        const cartItems: ICartItem[] = await fetcher<ICartItem[]>('cart', {
            method: 'GET',
            headers: {
                Cookie: authCookie,
            },
            credentials: 'include',
            next: {
                revalidate: FIVEMINUTES,
                tags: ['cartItem']
            },
        });
        return cartItems
    } catch (error) {
      return []
    }
}
