import { TIME_CACHE } from '@/app/common/constant';
import { fetcher, isErrorResponse } from '@/lib/utils';

export const getCategory = async () => {
	const categories = await fetcher<ICategory[]>('category', {
		method: 'GET',
		next: {
			revalidate: TIME_CACHE,
			tags: ['categories'],
		},
	});
	if (isErrorResponse(categories)) {
		return [];
	}
	return categories;
};
