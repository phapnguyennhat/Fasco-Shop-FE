'use client';
import { register } from '@/app/action';
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
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

const formSchema = z
  .object({
    firstName: z.string().min(2, 'First Name is required').max(50),
    lastName: z.string().min(2, 'Last Name is required').max(50),
    username: z.string().min(2, 'Username is required').max(50),
    email: z.string().email(),
    password: z.string().min(6, 'The password must be at least 6 characters long.').max(50),
    confirmPassword: z.string().min(6,  'The password must be at least 6 characters long.').max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"], // Chỉ định lỗi hiển thị cho trường confirmPassword
  });

export type CreateAccount = z.infer<typeof formSchema>;

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',

        },
    });

    

    

    const dispatch = useDispatch();
    const { toast } = useToast();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            dispatch(setSpinner(true));
            await register(values);
            dispatch(setSpinner(false));
            toast({
                description: 'Create Account successfully.',
            });
            form.reset({
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                username: '',
            });
        } catch (error:  any) {
            if ( error.message && error.message !== 'NEXT_REDIRECT') {
                if(error.message.includes('Email')){
                    form.setError('email', {message: error.message})
                }

                if(error.message.includes('Username')){
                    form.setError('username', {message: error.message})
                }

                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: error.message,
                });
            }
            
            dispatch(setSpinner(false));
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid  md:grid-cols-2 gap-x-4 gap-y-2   mb-[40px]"
            >
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="text"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="First Name"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=" px-4" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="text"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Last Name"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=" px-4" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="text"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Username"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=" px-4" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="email"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=" px-4" />
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
                                    type="password"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Password"
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

                <div className="  md:col-span-2 flex justify-center flex-col  items-center pt-4">
                    <button
                        className=" button-black mb-[20px]  min-h-[48px]  font-semibold w-[80%] "
                        type="submit"
                    >
                        Create Account
                    </button>

                    <p>
                        Already have an account?{' '}
                        <Link className=" text-blue-500" href={'/login'}>
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
}
