'use client';
import { FaFacebook } from 'react-icons/fa';

import { useLogin } from 'react-facebook';
import { loginFacebook } from '@/app/action';
import { useDispatch } from 'react-redux';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { useToast } from '@/hooks/use-toast';

export default function LoginFacebook() {
    const { login, status, isLoading, error } = useLogin();

    const dispatch = useDispatch()
    const {toast} = useToast()

    async function handleLogin() {
        try {
            dispatch(setSpinner(true))
            const response = await login({
                scope: 'email',
            });

            await loginFacebook(response.authResponse.accessToken);
            dispatch(setSpinner(false))

        } catch (error: any) {
            if ( error.message && error.message !== 'NEXT_REDIRECT') {
                toast({
                    variant: 'destructive',
                    title: 'Xác thực bằng Google không thành công ',
                    description: 'Vui lòng thử lại sau.',
                });
            }
            dispatch(setSpinner(false))
        }
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
