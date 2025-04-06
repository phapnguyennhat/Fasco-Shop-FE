import { TIME_CACHE } from '@/app/common/constant';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const getOrder = async (query: string) => {
	const authCookie = await getAuthCookies();

	const orders = await fetcher<{ orders: IOrder[]; count: number }>(
		`user/order?${query}`,
		{
			method: 'GET',
			headers: {
				Cookie: authCookie,
			},
			next: {
				revalidate: TIME_CACHE,
				tags: ['orders'],
			},
		},
	);
	if (isErrorResponse(orders)) {
		return { orders: [], count: 0 };
	}
	return orders;
};



export const getOrderById = async(id: string)=>{
    const authCookie = await getAuthCookies()
    const order = await fetcher<IOrder>(`user/order/${id}`, {
        method: 'GET',
        headers: {
            Cookie: authCookie
        },
        next: {
            revalidate: TIME_CACHE,
            tags: [`order-${id}`]
        }
    })
    if(isErrorResponse(order)){
        notFound()
    }
    return order
}

