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
import { isErrorResponse } from '@/lib/utils';
import { confirmCode, sendCodeResetPassword } from '@/API/auth/action';

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
        dispatch(setSpinner(true));
        try {
            const response = await sendCodeResetPassword({ email });

            if (isErrorResponse(response)) {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: response.message,
                });
            }
        } catch (error: any) {}
        dispatch(setSpinner(false));
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(setSpinner(true));
        try {
            const response = await confirmCode(email, values.code);
            if (isErrorResponse(response)) {
                if (response.message.includes('Code')) {
                    form.setError('code', { message: response.message });
                }
            } else {
                form.reset({
                    code: '',
                });
            }
        } catch (error: any) {}

        dispatch(setSpinner(false));
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
