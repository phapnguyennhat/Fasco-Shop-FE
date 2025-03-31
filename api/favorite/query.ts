import { TIME_CACHE } from '@/app/common/constant';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';

export const getFavoriteProducts = async (query: string) => {
	const authCookie = await getAuthCookies();
	const products = await fetcher<{
		favoriteDetails: IFavoriteDetail[];
		count: number;
	}>(`user/favorite?${query}`, {
		method: 'GET',
		headers: {
			Cookie: authCookie,
		},
		next: {
			revalidate: TIME_CACHE,
			tags: ['favoriteProducts'],
		},
	});
	if (isErrorResponse(products)) {
		return { favoriteDetails: [], count: 0 };
	}
	return products;
};
