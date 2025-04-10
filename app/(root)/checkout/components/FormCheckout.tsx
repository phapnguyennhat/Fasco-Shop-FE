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
import { Input } from '@/components/ui/input';
import SelectProvince from './SelectProvince';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SelectDistrict from './SelectDistrict';
import SelectCommune from './SelectCommune';
import { Check } from 'lucide-react';
import { createQueryString, isErrorResponse, SearchParams } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { AddressData, addressSchema } from '@/schema/address';
import { createAddress } from '@/API/address/action';
import { createOrder } from '@/API/order/action';
import { useSocket } from '@/provider/SocketProvider';
import { BsCashCoin } from 'react-icons/bs';
import Image from 'next/image';
import { genUrlMomo } from '@/API/momo/action';
import { USD2VND } from '@/app/common/constant';
interface IProps {
    provinces: IProvince[];
    province: IProvince | undefined;
    district: IDistrict | undefined;
    queryParams: SearchParams;
    address: IAddress | undefined
    user: User | undefined
}

export default function FormCheckout({
    provinces,
    queryParams,
    province,
    district,
    address,
    user
}: IProps) {
    const searchParams = useSearchParams();
    const selectedProvince = searchParams.get('province');
    const selectedDistrict = searchParams.get('district');
    const selectedCommune = searchParams.get('commune');
    const provinceId = selectedProvince?.split('-i.')[1];
    const districtId = selectedDistrict?.split('-i.')[1];
    const communeId = selectedCommune?.split('-i.')[1];
    const isWrap = JSON.parse(searchParams.get('wrap') || 'false');

    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'momo'>('cash');

    const [save, setSave] = useState(false);
    const socket = useSocket()
    const router = useRouter()


    // 1. Define your form.
    const form = useForm<AddressData>({
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


    useEffect(() => {
        if (address) {
            form.setValue('email', address.email)
            form.setValue('fullName', address.fullName)
            // form.setValue('lastName', address.lastName)
            form.setValue('phoneNumber', address.phoneNumber)
            form.setValue('street', address.street)

        }
    }, [address])

    useEffect(() => {
        form.setValue('provinceId', provinceId || '');
        form.setValue('districtId', districtId || '');
        form.setValue('communeId', communeId || '');
    }, [provinceId, districtId, communeId]);

    const { toast } = useToast()

    const dispatch = useDispatch()

    // 2. Define a submit handler.
    async function onSubmit(values: AddressData) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        dispatch(setSpinner(true))

        if (save) {
           
            const response = await createAddress(values);
            if (isErrorResponse(response)) {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: response.message,
                });
            }
        }
        const newOrder = await createOrder(values, isWrap, paymentMethod);

        if (isErrorResponse(newOrder)) {

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: newOrder.message,
            });
            dispatch(setSpinner(false))

        } else {
            if (socket) {

            
               
                const href = `/user/purchase/${newOrder.id}`
                const message = `${user?.name} has ordered ${newOrder.orderItems.length} items`
                socket.emit('send_order_action', {
                    message,
                    href,
                    receiverId: user?.id,
                    orderId: newOrder.id
                })
            }
            if (paymentMethod === 'cash') { 
                router.replace('checkout/status?resultCode=0&orderId=' + newOrder.id)
            }
            if (paymentMethod === 'momo') {
                // gen url momo payment
                const {subTotal, wrap, shipping} = newOrder.totalOrder
                const amount = subTotal + (wrap || 0) + (shipping || 0)
                const payUrl = await genUrlMomo(newOrder.id, Math.ceil(amount* USD2VND))
                if(isErrorResponse(payUrl)){
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: payUrl.message,
                    });
                } else {
                    router.replace(payUrl.payUrl)
        
                }
                
            }
            
            dispatch(setSpinner(false))
        }



    }
    return (
        <div className=" order-2    md:order-1 flex justify-center md:justify-end md:mr-[18px] lg:mr-[33px] ">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" w-full mx-4 md:w-[608px]  "
                >
                    <div className=" mb-3 md:mb-[18px] lg:mb-[26px] items-center w-full  inline-flex justify-between">
                        <h6 className=" font-volkhov text-2xl md:text-[32px] md:leading-[32px] lg:text-[46px] lg:leading-[46px] ">
                            Contact
                        </h6>
                        {/* <p>Select Address</p> */}
                    </div>

                    <div className=" flex flex-col mb-[16px] md:mb-0 gap-y-[16px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className=" mb-4 placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className=" ">
                                    <FormControl>
                                        <Input
                                            className="  placeholder:text-[#8A8A8A] font-poppins  rounded-none  py-[24px] px-[28px] "
                                            placeholder="Phone Number"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <h6 className=" mb-3 text-2xl md:text-[32px] md:leading-[32px] md:mb-[18px] lg:mb-[26px] md:mt-[32px] lg:mt-[44px] font-volkhov lg:text-[46px] lg:leading-[46px] ">
                        Delivery
                    </h6>

                    <div className=" grid  md:grid-cols-2  gap-x-[12px] gap-y-[16px] ">
                        <FormField

                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem className="col-span-2 ">
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
                    <button
                        type="button"
                        onClick={() => setSave(!save)}
                        className="    inline-flex mb-[30px]  mt-[26px] gap-x-[10px] items-center "
                    >
                        {save ? (
                            <div className=" size-[20px] md:size-[32px] bg-black">
                                <Check
                                    className=" size-[20px] md:size-[32px]"
                                    color="white"
                                />
                            </div>
                        ) : (
                            <div className=" size-[20px] md:size-[32px] border-[3px] border-black" />
                        )}
                        <p className=" font-poppins  font-normal text-[#8A8A8A]">
                            Save This Info for future
                        </p>
                    </button>

                    {/* Payment Method */}
                    <div className="mb-8">
                        <h6 className="mb-4 text-2xl md:text-[32px] md:leading-[32px] lg:text-[46px] lg:leading-[46px] font-volkhov">
                            Payment Method
                        </h6>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                type="button"
                                onClick={() => setPaymentMethod('cash')}
                                className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-300 ${
                                    paymentMethod === 'cash' 
                                        ? 'border-black bg-gray-50' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                                    paymentMethod === 'cash' 
                                        ? 'border-black bg-black' 
                                        : 'border-gray-300'
                                }`}>
                                    {paymentMethod === 'cash' && (
                                        <div className="size-2.5 bg-white rounded-full" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <BsCashCoin size={24} className="text-gray-700" />
                                    <span className="font-medium">Pay by Cash</span>
                                </div>
                            </button>

                            <button 
                                type="button"
                                onClick={() => setPaymentMethod('momo')}
                                className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all duration-300 ${
                                    paymentMethod === 'momo' 
                                        ? 'border-[#A50064] bg-[#FFF0F9]' 
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                                    paymentMethod === 'momo' 
                                        ? 'border-[#A50064] bg-[#A50064]' 
                                        : 'border-gray-300'
                                }`}>
                                    {paymentMethod === 'momo' && (
                                        <div className="size-2.5 bg-white rounded-full" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image src="/icons/momo-icon.svg" alt="momo" width={24} height={24} />
                                    <span className="font-medium">Pay by Momo</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <Button
                        className=" h-[66px] mb-[36px] text-center w-full font-poppins transition-all duration-300 hover:bg-gray-800 rounded-[10px] "
                        type="submit"
                    >
                        Order Now
                    </Button>
                    <p className="text-[12px] text-center">
                        Copyright © 2022 FASCO . All Rights Reseved.
                    </p>
                </form>
            </Form>
        </div>
    );
}
