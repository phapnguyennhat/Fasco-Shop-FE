'use server';
import { EStatusOrder } from '@/app/common/enum';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { AddressData } from '@/schema/address';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const createOrder = async (
	addressData: AddressData,
	isWrap: boolean,
) => {
	const authCookie = await getAuthCookies();
	const response = await fetcher<IResponse>(`user/order`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: authCookie,
		},
		body: JSON.stringify({ address: addressData, isWrap }),
	});
	if (isErrorResponse(response)) {
		return response;
	}
	revalidateTag('cartItem');
	revalidateTag('orders');
	revalidateTag('favoriteProducts');
	redirect('/user/purchase');
};




export const updateStatusOrder= async(orderId: string, status: EStatusOrder)=>{
    const authCookie = await getAuthCookies()
    const response = await fetcher(`user/order/${orderId}/${status}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Cookie: authCookie
        },
    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag('orders')
    revalidateTag(`order-${orderId}`)
}

export const updateAddressOrder= async(orderId: string, addressId: string, addressData: AddressData)=>
{
    const authCookie = await getAuthCookies()
    const response =await fetcher<IResponse>(`user/order/${orderId}/address/${addressId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie
        },
        body: JSON.stringify(addressData),

    })
    if(isErrorResponse(response)){
        return response
    }
    revalidateTag(`order-${orderId}`)
}
