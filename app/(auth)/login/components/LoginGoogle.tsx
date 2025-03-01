'use client';
import { googleLogin } from '@/app/action';
import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';



export default function LoginGoogle() {
    const { toast } = useToast();
    const dispatch =useDispatch()

    return (
        <GoogleLogin

            onSuccess={async (credentialResponse) => {
                const credential = credentialResponse.credential;

                try {
                    dispatch(setSpinner(true))
                   await googleLogin(credential as string);
                    dispatch(setSpinner(false))

                } catch (error:any) {
                    if ( error.message && error.message !== 'NEXT_REDIRECT') {
                        toast({
                            variant: 'destructive',
                            title: 'Xác thực bằng Google không thành công ',
                            description: 'Vui lòng thử lại sau.',
                        });
                    }
                    dispatch(setSpinner(false))
                }
            }}
            onError={() => {
                toast({
                    variant: 'destructive',
                    title: 'Xác thực bằng Google không thành công ',
                    description: 'Vui lòng thử lại sau .',
                });
            }}
        />
    );

}
