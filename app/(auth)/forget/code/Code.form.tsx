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
import { confirmCode, sendCodeResetPassword } from '@/app/action';

const formSchema = z.object({
    code: z.string().min(1, 'Code is required'),
});

interface IProps {
    email: string;
}
export default function Codeform({ email }: IProps) {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: '',
        },
    });

    const resendCode = async () => {
        try {
            dispatch(setSpinner(true));

            await sendCodeResetPassword({ email });
            dispatch(setSpinner(false));
        } catch (error: any) {
            if (error.message && error.message !== 'NEXT_REDIRECT')
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: error.message,
                });
            dispatch(setSpinner(false));
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            dispatch(setSpinner(true));
            await confirmCode(email, values.code);
            dispatch(setSpinner(false));

            form.reset({
                code: '',
            });
        } catch (error: any) {
            if(error.message && error.message.includes('Code')){
                form.setError('code', {message: error.message})
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
                className="  mb-[40px]"
            >
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type="text"
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Confirmation Code (6 digits)"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className=" px-4" />
                        </FormItem>
                    )}
                />

                <div className=" flex justify-center flex-col  items-center pt-4">
                    <button
                        className=" button-black mb-[20px] text-sm md:text-base  min-h-[48px]  font-semibold w-[80%] "
                        type="submit"
                    >
                        Recover Account
                    </button>

                    <p className=" text-center">
                        Didn’t receive Confirmation Code?{' '}
                        <button
                            onClick={resendCode}
                            type="button"
                            className=" text-blue-500"
                        >
                            Resend Now
                        </button>
                    </p>
                </div>
            </form>
        </Form>
    );
}
