import { TIME_CACHE } from '@/app/common/constant';
import { fetcher, isErrorResponse } from '@/lib/utils';

export const getBrands = async () => {
	const brands = await fetcher<{ name: string }[]>('brand?page=1&limit=6', {
		method: 'GET',
		next: {
			revalidate: TIME_CACHE,
			tags: ['brands'],
		},
	});
	if (isErrorResponse(brands)) {
		return [];
	}
	return brands;
};

export const getBrand = async () => {
	const brands = await fetcher<{
		groupedShop: Record<string, IBrand[]>;
		count: number;
	}>('brand', {
		method: 'GET',

		next: {
			revalidate: TIME_CACHE,
			tags: ['brands'],
		},
	});
	if (isErrorResponse(brands)) {
		return { groupedShop: {}, count: 0 };
	}
	return brands;
};


export const getAllBrand = async()=>{
    const brands = await fetcher<IBrand[]>('brand/all', {
        method: 'GET',
        next: {
            revalidate: TIME_CACHE,
            tags: ['brands']
        }
    })
    if(isErrorResponse(brands)){
        return []
    }
    return brands
}