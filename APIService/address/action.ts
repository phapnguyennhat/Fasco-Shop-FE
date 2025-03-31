'use server'

import getAuthCookies from "@/lib/getAuthCookie";
import { fetcher, isErrorResponse } from "@/lib/utils";
import { AddressData } from "@/schema/address"
import { revalidateTag } from "next/cache";

export const createAddress = async (addressData: AddressData) => {
	const authCookie = await getAuthCookies();
	const response = await fetcher<IResponse>('user/address', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: authCookie,
		},
		body: JSON.stringify(addressData),
	});
	if (isErrorResponse(response)) {
		return response;
	}
	revalidateTag('address');
};