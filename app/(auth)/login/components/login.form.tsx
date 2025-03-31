'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { isErrorResponse } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { LoginData, loginSchema } from '@/schema/auth';
import { login } from '@/API/auth/action';



export default function LoginForm() {
    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            account: '',
            password: '',
        },
    });

 

    const dispatch = useDispatch()
    const router = useRouter()

    async function onSubmit(values: LoginData) {
        dispatch(setSpinner(true));
        const response = await login({
            account: values.account,
            password: values.password,
        });
        if (isErrorResponse(response)) {
           
            form.setError('password', {
                message: response.message,
                type: 'value',
            });
        }else{
            router.replace('/')
        }
        dispatch(setSpinner(false));
    }

    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  mb-[40px]">
                <FormField
                    control={form.control}
                    name="account"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Email or Username"
                                    {...field}
                                />
                            </FormControl >

                            <FormMessage className=' px-4'  />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type='password'
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=' px-4' />
                        </FormItem>
                    )}
                />
                <div className=" flex justify-center flex-col  items-center pt-4">
                    <button
                        className=" button-black mb-[20px]  min-h-[48px]  font-semibold w-[80%] "
                        type="submit"
                    >
                        Sign In
                    </button>
                    <Link href={'/register'}
                        className=" py-2 mb-2 md:mb-3    font-semibold  text-[#5B86E5] rounded-[8px] text-center hover:bg-blue-50 transition-all duration-300 border border-[#5B86E5] w-[80%] "
                        type="submit"
                    >
                        Register Now
                    </Link>
                    <Link className=' font-bold hover:text-blue-300 transition-all duration-300 text-[#5B86E5] w-[80%] text-center md:text-end' href={'/forget'}>Forget Password</Link>
                </div>
            </form>
        </Form>
    );
}
