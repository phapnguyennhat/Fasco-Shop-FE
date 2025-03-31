import { TIME_CACHE } from '@/app/common/constant';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const getProductById = async (id: string, userId?: string) => {
	const query = userId ? `product/${id}?userId=${userId}` : `product/${id}`;

	const product = await fetcher<Product>(query, {
		method: 'GET',
		next: {
			revalidate: TIME_CACHE,
			tags: [`productDetail/${id}`],
		},
	});
	if (isErrorResponse(product)) {
		notFound();
	}
	return product;
};

export const getProducts = async (query: string) => {
	const products = await fetcher<{ products: Product[]; count: number }>(
		`product?${query}`,
		{
			method: 'GET',
			next: {
				revalidate: TIME_CACHE,
				tags: ['products'],
			},
		},
	);
	if (isErrorResponse(products)) {
		return { products: [], count: 0 };
	}
	return products;
};


export const getVariant = async(productId: string, query: string)=>{
    const variant = await fetcher<Varient>(`product/${productId}/varient?${query}`,{
        method: 'GET',
        next: {
            revalidate: 0
        }
    })
    if(isErrorResponse(variant)){
        notFound()
    }
    return variant
}

export const getProductDetailById = async(id: string) =>{
    const authCookie = await getAuthCookies()
    const product = await fetcher<Product>(`product/${id}/detail`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
        next: {
            revalidate: TIME_CACHE,
            tags: [`productDetail/${id}`]
        }
    })
    if(isErrorResponse(product)){
        notFound()
    }
    return product
    
}