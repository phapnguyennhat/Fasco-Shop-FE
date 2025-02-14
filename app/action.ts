'use server';

import { auth, signIn } from '@/auth';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher } from '@/lib/utils';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CreateAddress } from './(root)/checkout/schema';
import { UpdateProfile } from './(account)/user/profile/schema';
import { File } from 'buffer';

export const submitEmail = async (formData: FormData) => {
    const email = formData.get('email');
    // TODO: Call api to subscribe email
};

export async function login(body: { account: string; password: string }) {
    const token = await fetcher<LoginToken>('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const cookieStore = await cookies();
    cookieStore.set('Authentication', token.accessTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.accessTokenCookie.accessTime,
    });
    cookieStore.set('Refresh', token.refreshTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.refreshTokenCookie.accessTime,
    });
    redirect('/');
}

export async function googleLogin(credential: string) {
    const token = await fetcher<LoginToken>('google-auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });
    const cookieStore = await cookies();
    cookieStore.set('Authentication', token.accessTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.accessTokenCookie.accessTime,
    });
    cookieStore.set('Refresh', token.refreshTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.refreshTokenCookie.accessTime,
    });
    redirect('/');
}

export async function loginFacebook(credential: string) {
    const token = await fetcher<LoginToken>('facebook-auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });
    const cookieStore = await cookies();
    cookieStore.set('Authentication', token.accessTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.accessTokenCookie.accessTime,
    });
    cookieStore.set('Refresh', token.refreshTokenCookie.token, {
        httpOnly: true,
        path: '/',
        maxAge: token.refreshTokenCookie.accessTime,
    });
    redirect('/');
}

export async function logout() {
    const authCookie = await getAuthCookies();
    const response = fetch(`${process.env.BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
        },
    });
    const cookieStore = await cookies();
    cookieStore.delete('Authentication');
    cookieStore.delete('Refresh');
    redirect('/login');
}

export async function addCart(formData: FormData) {
    const quantity = formData.get('quantity');
    const varientId = formData.get('varientId');
    const authCookie = await getAuthCookies();

    await fetcher('cart', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },

        body: JSON.stringify({ quantity, varientId }),
    });

    revalidateTag('cartItem');
}

export async function updateCartItem(id: string, quantity: number) {
    const authCookie = await getAuthCookies();

    await fetcher(`cart/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },

        body: JSON.stringify({ quantity }),
    });
    revalidateTag('cartItem');
}

export async function deleteCartItem(id: string) {
    const authCookie = await getAuthCookies();
    await fetcher(`cart/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
    });
    revalidateTag('cartItem');
}

export async function createOrder(
    createAddress: CreateAddress,
    isWrap: boolean,
) {
    const authCookie = await getAuthCookies();
    await fetcher(`user/order`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify( {address: createAddress,isWrap})
    });
    revalidateTag('cartItem');
}

export async function createAddress (createAddress: CreateAddress){
    try {
        const authCookie= await getAuthCookies()
        await fetcher('user/address', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: authCookie,
            },
            body: JSON.stringify(createAddress),
        });
        revalidateTag('address')
    } catch (error) {
        
    }
}

export async function updateProfile (updateProfile: UpdateProfile){
        const authCookie = await getAuthCookies()
        await fetcher('user', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: authCookie,
            },
            body: JSON.stringify(updateProfile),
        });
        revalidateTag('profile')
}

export async function updateAvatar(file: Blob){
    const formData = new FormData();
    formData.append('file', file )

    const authCookie = await getAuthCookies()
    await fetcher('user/avatar', {
        method: 'PUT',
        credentials: 'include',
            headers: {
               
                Cookie: authCookie,
            },
            body: formData
    })
    revalidateTag('profile')
}

export async function createFavorite (productId: string){
    const authCookie = await getAuthCookies()
    await fetcher(`user/favorite/${productId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Cookie: authCookie,
        },
    })
    revalidateTag(`productDetail/${productId}`)
}

export async function deleteFavoriteAbulk(productIds: string[]) {
    const authCookie = await getAuthCookies();
    await fetcher('user/favorite', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: authCookie,
        },
        body: JSON.stringify({ productIds }),
    });

    productIds.forEach((productId) => {
        revalidateTag(`productDetail/${productId}`);
    });
}


