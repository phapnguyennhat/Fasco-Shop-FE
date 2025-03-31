'use client';
import { sendCodeResetPassword } from '@/api/auth/action';
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
import { delay, isErrorResponse } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';



const formSchema = z.object({
  email: z.string().email(),
});


export default function ForgetForm() {

  const dispatch = useDispatch()
  const {toast} = useToast()

   const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
           email: '',
       },
   });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(setSpinner(true));
        try {

            const response = await sendCodeResetPassword(values);
            if (isErrorResponse(response)) {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: response.message,
                });
            } else {
                form.reset({
                    email: '',
                });
            }
        } catch (error: any) {}
        dispatch(setSpinner(false));
    }
  
  return (
    <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="  mb-[40px]">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input
                                    type='email'
                                    className=" px-4 outline-none  w-full border-b-2 py-2"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl >

                            <FormMessage className=' px-4'  />
                        </FormItem>
                    )}
                />

                
                <div className=" flex justify-center flex-col  items-center pt-4">
                    <button
                        className=" button-black mb-[20px] text-sm md:text-base  min-h-[48px]  font-semibold w-[80%] "
                        type="submit"
                    >
                        Send Confirmation Code
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
  )
}
