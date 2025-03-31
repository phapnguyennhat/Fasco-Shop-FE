'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { isErrorResponse } from '@/lib/utils';
import { changePassword } from '@/APIService/auth/action';
import { UpdatePasswordData, updatePasswordSchema } from '@/schema/auth';

interface IProps {
    user: User | undefined;
}

export default function FormChangePassword({ user }: IProps) {
    const [loading, setLoading] = useState(false);

    const form = useForm<UpdatePasswordData>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: '',
            new_password: '',
            confirm_password: '',
        },
    });

    const { toast } = useToast();

    async function onSubmit(values: UpdatePasswordData) {
            setLoading(true);
            const response = await changePassword(values)
            if(isErrorResponse(response)){
                if(response.message.includes('Password')){
                    form.setError('password', {message: response.message})
                }else{
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: response.message,
                    });
                }
            }else{
                toast({
                    description: 'Update password successfully.',
                });
            }
            setLoading(false)
        
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-[20px] mx-4  sm:mx-auto sm:w-[80%]  mb-[30px] "
            >
                <FormField
                    control={form.control}
                    name="password"
                  
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-[80px_auto]  sm:grid-cols-[152px_auto] gap-x-[20px] ">
                            <FormLabel className=" font-normal pt-[20px] text-right">
                                Password
                            </FormLabel>
                            <div>
                                <FormControl>
                                    <Input type='password'  placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => (
                        <FormItem className="grid  grid-cols-[80px_auto]  sm:grid-cols-[152px_auto]  gap-x-[20px] ">
                            <FormLabel className=" font-normal pt-[12px] sm:pt-[20px] text-right">
                                New Password
                            </FormLabel>
                            <div>
                                <FormControl>
                                    <Input
                                     type='password'
                                        placeholder="New Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-[80px_auto]   sm:grid-cols-[152px_auto]  gap-x-[20px] ">
                            <FormLabel className=" font-normal pt-[12px] sm:pt-[20px] text-right">
                                Confirm Password
                            </FormLabel>
                            <div>
                                <FormControl>
                                    <Input
                                     type='password'

                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <div className=" w-full flex justify-center">
                    {' '}
                    <Button
                        disabled={loading}
                        className={` px-6 py-4 ${loading && 'bg-gray-800'} `}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}
