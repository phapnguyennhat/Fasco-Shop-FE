'use client';

import { deleteShop } from '@/app/action';
import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormUpdateShop from './FormUpdateShop';
import DialogDeleteShop from './DialogDeleteShop';

interface IProps {
    brand: IBrand;
}
export default function ShopCardAdmin({ brand }: IProps) {
    const dispatch = useDispatch()

    const [openEdit, setOpenEdit] = useState(false)

 
    const {toast} = useToast()

    const handleDelete = async ()=>{
        try {
            dispatch(setSpinner(true))

            await deleteShop(brand.id)

            dispatch(setSpinner(false))
            toast({
                description: ' Delete shop successfully.',
              });

        } catch (error: any) {

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: error.message,
            });
            dispatch(setSpinner(false))
            
        }
    }

    if(openEdit){
        return <FormUpdateShop setOpenEdit={setOpenEdit} brand={brand} />
    }

    
    return (
        <li className=" group  w-full   inline-flex flex-col items-center">
            <div className=" relative px-4 overflow-hidden  border w-full  mb-[8px] md:mb-[20px] sm:h-[160px] md:h-[120px] h-[100px]   flex justify-center items-center">
                <img
                    src={brand.image.url}
                    alt={brand.name}
                    // width={300}
                    // height={300}
                    loading='lazy'
                    className=" object-cover     h-auto "
                />
                <div className="absolute inset-0 flex items-center justify-center  ">
                    <div
                        className=" invisible group-hover:visible opacity-0 group-hover:opacity-100 
                        translate-y-[10px] group-hover:translate-y-0 transition-all duration-300 
                        inline-flex gap-3"
                    >
                        <button onClick={()=>setOpenEdit(true)} className=" p-2 text-white rounded-lg bg-black/70 hover:bg-black/85">
                            
                            <Pencil size={20} />
                        </button>
                        {/* <button  onClick={handleDelete}  className=" p-2 text-white rounded-lg bg-black/70 hover:bg-red-500 ">
                            <Trash2 size={20} />
                        </button> */}
                        <DialogDeleteShop handleDelete={handleDelete} />
                    </div>
                </div>
            </div>
            <div className=" text-black text-center text-base md:text-xl">
                {brand.name}
            </div>
            
        </li>
    );
}
