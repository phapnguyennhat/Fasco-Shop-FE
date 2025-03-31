'use client';
import { googleLogin } from '@/API/auth/action';
import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { isErrorResponse } from '@/lib/utils';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';



export default function LoginGoogle() {
    const { toast } = useToast();
    const dispatch =useDispatch()

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                try {
                    const credential = credentialResponse.credential;
                    dispatch(setSpinner(true));
                    const response = await googleLogin(credential as string);
                    if (isErrorResponse(response)) {
                        toast({
                            variant: 'destructive',
                            title: 'Authentication with Google failed',
                            description: 'Try again later.',
                        });
                    }
                } catch (error) {
                }
                dispatch(setSpinner(false));
            }}
            onError={() => {
                toast({
                    variant: 'destructive',
                    title: 'Authentication with Google failed',
                    description: 'Try again later.',
                });
            }}
        />
    );

}
