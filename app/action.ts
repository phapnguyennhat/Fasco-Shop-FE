'use server';

import { auth, signIn } from '@/auth';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher } from '@/lib/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
