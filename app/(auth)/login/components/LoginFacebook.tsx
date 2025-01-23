'use client';
import { FaFacebook } from 'react-icons/fa';

import { useLogin } from 'react-facebook';
import { loginFacebook } from '@/app/action';

export default function LoginFacebook() {
    const { login, status, isLoading, error } = useLogin();

    async function handleLogin() {
        try {
            const response = await login({
                scope: 'email',
            });

            await loginFacebook(response.authResponse.accessToken);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <button
            className=" border py-2    px-3 hover:border-blue-100 hover:bg-blue-50 rounded-sm transition-all duration-300 text-sm  inline-flex justify-center items-center gap-2 "
            onClick={handleLogin}
            disabled={isLoading}
        >
            <FaFacebook size={24} className=" text-blue-500" /> Login via
            Facebook
        </button>
    );
}
