'use server';

import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { revalidateTag } from 'next/cache';

export const createTag = async (name: string) => {
	const authCookie = await getAuthCookies();

	const response = await fetcher('tag', {
		method: 'POST',
		credentials: 'include',
		headers: {
			Cookie: authCookie,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	});
	if (isErrorResponse(response)) {
		return response;
	}
	revalidateTag('tags');
};

export const updateTag = async (tagId: string, name: string) => {
	const authCookie = await getAuthCookies();
	const response = await fetcher(`tag/${tagId}`, {
		method: 'PUT',
		headers: {
			Cookie: authCookie,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	});

	if (!isErrorResponse(response)) {
		revalidateTag('tags');
	}
	return response;
};

export const deleteTag = async (tagId: string) => {
	const authCookie = await getAuthCookies();
	const response = await fetcher(`tag/${tagId}`, {
		method: 'DELETE',
		headers: {
			Cookie: authCookie,
		},
	});
	if (!isErrorResponse(response)) {
		revalidateTag('tags');
	}
	return response;
};
