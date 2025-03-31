'use server';
import getAuthCookies from '@/lib/getAuthCookie';
import { fetcher, isErrorResponse } from '@/lib/utils';
import { LoginData, RegisterData, UpdatePasswordData } from '@/schema/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const login = async (data: LoginData) => {
	const token = await fetcher<LoginToken>('auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (isErrorResponse(token)) {
		return token;
	}
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
};

export const register = async (data: RegisterData) => {
	const body = {
		name: data.lastName + ' ' + data.firstName,
		username: data.username,
		password: data.password,
		email: data.email,
	};
	const responseRegister = await fetcher<IResponse>('auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	if (isErrorResponse(responseRegister)) {
		return responseRegister;
	}

	const responseLogin = await login({
		account: data.username,
		password: data.password,
	});
	if (isErrorResponse(responseLogin)) {
		return responseLogin;
	}
};

export const googleLogin = async (credential: string) => {
	const token = await fetcher<LoginToken>('google-auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ credential }),
	});

	if (isErrorResponse(token)) {
		return token;
	}

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
};

export const loginFacebook = async (credential: string) => {
	const token = await fetcher<LoginToken>('facebook-auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ credential }),
	});

	if (isErrorResponse(token)) {
		return token;
	}

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
};

export const logout = async () => {
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
};



export async function changePassword(updatePasswordData: UpdatePasswordData){
	const authCookie = await getAuthCookies()
	const response = await fetcher<IResponse>('auth/change-password', {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: authCookie,
		},
		body: JSON.stringify(updatePasswordData),
	})
	return response
}

export const sendCodeResetPassword = async(body: {email: string})=>{
	const response = await fetcher('auth/resetPassword/code', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	if(isErrorResponse(response)){
		return response
	}
	const cookieStore = await cookies();
	cookieStore.set('Email', body.email, {
		httpOnly: true,
		path: '/',
		maxAge: 300,
	});
	redirect('/forget/code')
}


export async function confirmCode (email: string, code: string){
	const response =await  fetcher<Token>('auth/resetPassword/confirm', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email, code})
	})
	
	if(isErrorResponse(response)){
		return response
	}
	const {token, accessTime} = response

	const cookieStore = await cookies();
	cookieStore.delete('Email')

	cookieStore.set('ResetPassword', token, {
		httpOnly: true,
		path: '/',
		maxAge: accessTime,
	});
	redirect('/forget/password')
}


export async function resetPassword (password: string){
	const cookieStore = await cookies()
	const resetPasswordCookie = cookieStore.get('ResetPassword')
	if(!resetPasswordCookie){
		throw new Error('have not token reset password')
	}
	const {name, value} = resetPasswordCookie

	const cookie = `${name}=${value}`
	
	const response =await fetcher('auth/resetPassword',{
		method: 'POST',
		headers: {
			Cookie: cookie,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({password})
	})
	if(isErrorResponse(response)){
		return response
	}
	cookieStore.delete('ResetPassword')

	// redirect('/login')
}

