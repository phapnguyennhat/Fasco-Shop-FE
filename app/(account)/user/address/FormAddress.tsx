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
import { isErrorResponse, SearchParams } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { addressSchema, CreateAddress } from '@/app/(root)/checkout/schema';
import { useEffect, useState } from 'react';
import { createAddress } from '@/app/action';
import { Input } from '@/components/ui/input';
import SelectProvince from '@/app/(root)/checkout/components/SelectProvince';
import SelectCommune from '@/app/(root)/checkout/components/SelectCommune';
import SelectDistrict from '@/app/(root)/checkout/components/SelectDistrict';
import { useToast } from '@/hooks/use-toast';

interface IProps {
    provinces: IProvince[];
    province: IProvince | undefined;
    district: IDistrict | undefined;
    queryParams: SearchParams;
    address: IAddress | undefined;
}

export default function FormAddress({
    provinces,
    province,
    district,
    queryParams,
    address,
}: IProps) {
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const selectedProvince = searchParams.get('province');
    const selectedDistrict = searchParams.get('district');
    const selectedCommune = searchParams.get('commune');
    const provinceId = selectedProvince?.split('-i.')[1];
    const districtId = selectedDistrict?.split('-i.')[1];
    const communeId = selectedCommune?.split('-i.')[1];

    // 1. Define your form.
    const form = useForm<CreateAddress>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            email: '',
            phoneNumber: '',
            fullName: '',
            provinceId: '',
            districtId: '',
            communeId: '',
            street: '',
        },
    });

    const { toast } = useToast();

    useEffect(() => {
        if (address) {
            form.setValue('email', address.email);
            form.setValue('fullName', address.fullName);
            // form.setValue('lastName', address.lastName)
            form.setValue('phoneNumber', address.phoneNumber);
            form.setValue('street', address.street);
        }
    }, [address]);

    useEffect(() => {
        form.setValue('provinceId', provinceId || '');
        form.setValue('districtId', districtId || '');
        form.setValue('communeId', communeId || '');
    }, [provinceId, districtId, communeId]);

    // 2. Define a submit handler.
    async function onSubmit(values: CreateAddress) {
        try {
            setLoading(true);
            const response = await createAddress(values);
            if(isErrorResponse(response)){
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: response.error.message
                });
            }else{

                toast({
                    description: 'Update Address successfully.',
                });
            }
            setLoading(false);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
            });
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="  mx-auto w-[90%] sm:w-[80%]  mb-[30px]  "
            >
                <div className="  mb-[16px] items-center w-full  inline-flex justify-between">
                    <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                        Contact
                    </h6>
                </div>

                <div className=" flex flex-col mb-[30px]  gap-y-[16px]">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-[80px_auto]  sm:grid-cols-[152px_auto] gap-x-[20px]">
                                <FormLabel className=" font-normal pt-[20px] text-right">
                                    Email
                                </FormLabel>
                                <div>
                                    {' '}
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
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
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-[80px_auto]  sm:grid-cols-[152px_auto] gap-x-[20px]">
                                <FormLabel className=" font-normal  pt-[12px] sm:pt-[20px]  text-right">
                                    Phone Number
                                </FormLabel>
                                <div>
                                    {' '}
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
                </div>

                <h6 className=" mb-[16px] font-volkhov text-2xl sm:text-[30px]  md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                    Delivery
                </h6>

                <div className=" grid mb-[30px] grid-cols-1 gap-y-[16px]  md:grid-cols-2  md:gap-x-[12px] md:gap-y-[16px] ">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2 ">
                                <FormControl>
                                    <Input
                                        className="  placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                        placeholder="Full Name"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="provinceId"
                        render={({ field }) => (
                            <FormItem className=" ">
                                <FormControl>
                                    <Input
                                        className="  hidden placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                        placeholder="ProvinceId"
                                        {...field}
                                        readOnly
                                        value={provinceId || ''}
                                    />
                                </FormControl>

                                <SelectProvince
                                    provinces={provinces}
                                    queryParams={queryParams}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="districtId"
                        render={({ field }) => (
                            <FormItem className=" ">
                                <FormControl>
                                    <Input
                                        className="  hidden placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                        placeholder="DistrictId"
                                        {...field}
                                        readOnly
                                        value={districtId || ''}
                                    />
                                </FormControl>

                                <SelectDistrict
                                    province={province}
                                    queryParams={queryParams}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="communeId"
                        render={({ field }) => (
                            <FormItem className=" ">
                                <FormControl>
                                    <Input
                                        className="  hidden placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                        placeholder="CommuneId"
                                        {...field}
                                        readOnly
                                        value={districtId || ''}
                                    />
                                </FormControl>

                                <SelectCommune
                                    district={district}
                                    queryParams={queryParams}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem className=" ">
                                <FormControl>
                                    <Input
                                        disabled={!communeId}
                                        className="  placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                        placeholder="Street"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

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
