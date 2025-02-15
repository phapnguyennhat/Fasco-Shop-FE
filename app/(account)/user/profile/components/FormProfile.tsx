'use client';

import { profileSchema, UpdateProfile } from '../schema';
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
import { Input } from '@/components/ui/input';
import  SelectGender  from './SelectGender';
import { EGender } from '@/app/common/enum';

import { updateProfile } from '@/app/action';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface IProps {
    user: User | undefined;
}
export default function FormProfile({ user }: IProps) {
    const form = useForm<UpdateProfile>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: user?.email || '',
            phoneNumber: user?.phoneNumber|| '',
            birthday: user?.birthday|| '',
            gender: user?.gender||'',
            name: user?.name||'',
        },
    });

    const { toast } = useToast()
    
    const [loading, setLoading ] = useState(false)

   async function  onSubmit(values: UpdateProfile) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            setLoading(true)
           await  updateProfile(values)
           setLoading(false)
           toast({
            description: "Update profile successfully.",
            
          })
        } catch (error: any) {

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
              })
              setLoading(false)
        }
    }

    return (
        <div className="  md:w-[70%] mr-4 ">
            <div className="  grid grid-cols-[80px_auto] lg:grid-cols-[152px_auto]">
                <span className="  text-right">Username</span>
                <span className=" text-[#333] pl-[20px] pb-[20px]">
                    {user?.username}
                </span>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-[20px]"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                <FormLabel className=" font-normal pt-[20px] text-right">
                                    Name
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                <FormLabel className=" font-normal pt-[20px] text-right">
                                    Email
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                <FormLabel className=" font-normal pt-[20px] text-right">
                                    Phone Number
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <Input
                                            placeholder="Phone Number"
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
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto]  gap-x-[20px] ">
                                <FormLabel className=" font-normal pt-[20px] text-right">
                                    Gender
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <Input
                                            className=" hidden"
                                            readOnly
                                            placeholder="Gender"
                                            {...field}
                                        />
                                    </FormControl>
                                    <SelectGender
                                        form={form}
                                        gender={
                                            form.getValues('gender') as EGender
                                        }
                                    />
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem className="grid  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                                <FormLabel className=" font-normal pt-[20px] text-right">
                                    Birthday
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <Input
                                            className="w-auto"
                                            placeholder="Birthday"
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* <SelectBirthday form={form} birthday={form.getValues('birthday')}/> */}
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className=" w-full flex justify-center">
                        {' '}
                        <Button disabled={loading} className={` px-6 py-4 ${loading && 'bg-gray-800'} `} type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
