import { TIME_CACHE } from '@/app/common/constant';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';

export const getAddress = async () => {
	try {
		const authCookie = await getAuthCookies();

		const address = await fetcher<IAddress | undefined>('user/address', {
			method: 'GET',
			headers: {
				Cookie: authCookie,
			},

			next: {
				revalidate: TIME_CACHE,
				tags: ['address'],
			},
		});
		if (isErrorResponse(address)) {
			return undefined;
		}
		return address;
	} catch (error) {
		return undefined;
	}
};
