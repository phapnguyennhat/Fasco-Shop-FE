'use client';
import { googleLogin } from '@/app/action';
import { useToast } from '@/hooks/use-toast';
import { GoogleLogin } from '@react-oauth/google';



export default function LoginGoogle() {
    const { toast } = useToast();

    return (
        <GoogleLogin

            onSuccess={async (credentialResponse) => {
                const credential = credentialResponse.credential;

                try {
                    googleLogin(credential as string);
                } catch (error) {
                    toast({
                        variant: 'destructive',
                        title: 'Xác thực bằng Google không thành công ',
                        description: 'Vui lòng thử lại sau.',
                    });
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
