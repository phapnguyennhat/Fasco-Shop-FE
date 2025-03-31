'use client';
import { FaFacebook } from 'react-icons/fa';

import { useLogin } from 'react-facebook';
import { useDispatch } from 'react-redux';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { useToast } from '@/hooks/use-toast';
import { isErrorResponse } from '@/lib/utils';
import { loginFacebook } from '@/API/auth/action';

export default function LoginFacebook() {
    const { login, status, isLoading, error } = useLogin();

    const dispatch = useDispatch()
    const {toast} = useToast()

    async function handleLogin() {
        dispatch(setSpinner(true))

        try {
            const response = await login({
                scope: 'email',
            });
            const responseLogin = await loginFacebook(response.authResponse.accessToken);
            if(isErrorResponse(responseLogin)){
                toast({
                    variant: 'destructive',
                    title: 'Authentication with Facebook failed',
                    description: 'Try again later.',
                });
            }
            
        } catch (error) {
        }
        dispatch(setSpinner(false))

    }

    return (
        <button
            className=" border py-2    px-3 hover:border-blue-100 hover:bg-blue-50 rounded-sm transition-all duration-300 text-sm  inline-flex justify-center items-center gap-2 "
            onClick={handleLogin}
            disabled={isLoading}
        >
            <FaFacebook size={24} className=" text-blue-500" /> 
          <span className=' w-full'>  Login via Facebook</span>
        </button>
    );
}
