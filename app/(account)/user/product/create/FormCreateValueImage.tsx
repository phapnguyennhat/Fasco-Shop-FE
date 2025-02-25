'use client';

import { Input } from '@/components/ui/input';
import {
    removeValue,
    setValue,
} from '@/lib/features/attrProduct/attrProductSlice';
import { RootState } from '@/lib/store';
import { Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, Dispatch, memo, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
    indexAttr: number;
    indexValue: number;
      valueImages: Blob[],
      setValueImages:  Dispatch<SetStateAction<Blob[]>>
    
}

 function FormCreateValueImage({
    indexAttr,
    indexValue,
    valueImages,setValueImages
}: IProps) {
    const dispatch = useDispatch();

    const file =  valueImages[indexValue]

    const handleRemove = () => {
        dispatch(removeValue({ indexAttr, indexValue }));
        setValueImages(valueImages.filter((_,index)=>index!==indexValue))
        // dispatch(removeImage({ indexValue }));
    };

      const onChangeValue = (e: ChangeEvent<HTMLInputElement>) =>{
        dispatch(setValue({indexAttr,indexValue,value: e.target.value}))
      }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newValueImages = [...valueImages]
            newValueImages[indexValue] = file
            setValueImages(newValueImages)
        }
    };



    return (
        <div className=" flex  gap-2 items-center">
            <Input onChange={onChangeValue}  className="w-[50%] bg-white" placeholder="value" />

            {/* Upload Image Input */}
            <label className=" lg:w-[20%] inline-flex justify-center items-center  text-sm cursor-pointer font-medium">
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                        
                />
                {file ? (
                    <Image
                        src={URL.createObjectURL(file)}
                        alt="image"
                        width={80}
                        height={80}

                        className="object-cover size-[60px] md:size-[80px] "
                    />
                ) : (
                    <span className="">Image</span>
                )}
            </label>

            {/* Image Preview */}

            <div className="w-[10%] inline-flex justify-end items-center">
                {indexValue !== 0 && (
                    <button onClick={handleRemove} type="button" className="">
                        <Trash2 size={20} /> 
                    </button>
                )}
            </div>
        </div>
    );
}

export default memo(FormCreateValueImage)
