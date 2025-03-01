'use client';

import { z } from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from '@/app/action';
import { delay } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const formSchema = z
    .object({
        password: z.string().min(1, 'Password is required'),
        confirmPassword: z.string().min(1, 'Confirm Password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Confirm password must match new password',
        path: ['confirmPassword'],
    });
export default function PasswordForm() {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const router = useRouter()

     async function onSubmit(values: z.infer<typeof formSchema>) {
            try {
                dispatch(setSpinner(true));
                await resetPassword(values.password)
                dispatch(setSpinner(false));
    
                form.reset({
                    password: '',
                    confirmPassword: ''
                });

                toast({
                    description: 'Reset  pasword successfully.',
                });
                await delay(1000)
                router.replace('/login')
                
            } catch (error: any) {
                console.log(error.message, 'message')
                if(error.message && error.message.includes('Password')){
                    form.setError('password', {message: error.message})
                }
                else if (error.message && error.message !== 'NEXT_REDIRECT')
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: error.message,
                    });
                dispatch(setSpinner(false));
                
            }
        }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="  mb-[40px] space-y-2"
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="password"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="New Password"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=" px-4" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="password"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Confirm Password"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=" px-4" />
                        </FormItem>
                    )}
                />

                <div className=" flex justify-center flex-col  items-center pt-4">
                    <button
                        className=" rounded-[8px] px-4 py-2 bg-[#5B86E5] hover:bg-blue-400 text-white mb-[20px] text-sm md:text-base  min-h-[48px]  font-semibold w-[80%] "
                        type="submit"
                    >
                        Submit
                    </button>

                   
                </div>
            </form>
        </Form>
    );
}
