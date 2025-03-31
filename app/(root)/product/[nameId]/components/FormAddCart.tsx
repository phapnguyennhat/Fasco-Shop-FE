'use client';
import React, { useState } from 'react';
import InputQuantity from './InputQuantity';
import AddSuccessModal from './AddSuccessModal';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { isErrorResponse } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { addCart } from '@/APIService/cart/action';

interface IProps {
    varient: Varient;
}

export default function FormAddCart({ varient }: IProps) {
    const [openSuccess, setOpenSuccess] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch();
    const router = useRouter()

    const handleAddCartItem = async (formData: FormData) => {
        dispatch(setSpinner(true));
        const response = await addCart(formData);
        dispatch(setSpinner(false));

        if (isErrorResponse(response)) {
            
            if(response.statusCode===401){
                router.push('/login')
                return 
            }
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: response.message,
            });
        } else {
            setOpenSuccess(true);
            setTimeout(() => {
                setOpenSuccess(false);
            }, 3500);
        }
    };

    return (
        <>
            <div className="  font-volkhov text-black">Quantity</div>
            <form
                className=" w-full mb-[18px] md:mb-[40px] lg:mb-[60px]"
                action={handleAddCartItem}
            >
                <div className=" w-full mt-[13px] inline-flex gap-[30px]">
                    <InputQuantity maxQuantity={varient.pieceAvail} />
                    <input
                        hidden
                        readOnly
                        value={varient.id}
                        name="varientId"
                    />
                    <button
                        disabled={varient.pieceAvail <= 0}
                        className={` font-volkhov text-black border h-[45px] border-black rounded-[5px]  w-[60%]  lg:w-[70%] transition-all duration-300 ${
                            varient.pieceAvail <= 0
                                ? 'bg-black/55 border-none text-gray-400'
                                : 'hover:bg-black hover:text-white '
                        } `}
                    >
                        Add to cart
                    </button>
                </div>
            </form>

            <AddSuccessModal
                openSuccess={openSuccess}
                setOpenSuccess={setOpenSuccess}
            />
        </>
    );
}
