'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BadgePlus, X } from 'lucide-react';
import { ChangeEvent,  } from 'react';
import FormCreateValue from './FormCreateValue';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { newValue, removeAttr, setAttrName } from '@/lib/features/attrProduct/attrProductSlice';

interface IProps {
   indexAttr: number,
 
}
export default function FormCreateAttr({
    indexAttr
}: IProps) {
    const attrValues = useSelector((state: RootState)=>state.attrProduct.value.values[indexAttr])
    const nameAttr = useSelector((state: RootState)=>state.attrProduct.value.nameAttrs[indexAttr])

    const dispatch = useDispatch()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAttrName({indexAttr, attrName: e.target.value}))
    };

    const handleClickNewValue = () => {
       dispatch(newValue({indexAttr}))
    };

    const handleRemove = () => {
        dispatch(removeAttr({indexAttr}))
    };

    return (
        <div className="relative  bg-gray-100 p-4  ">
            <div className='mb-[20px]' >Attribute {indexAttr + 1}</div>
            <div className="  mb-4  grid gap-2 items-center  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                <Label className=" font-normal  text-right">Name</Label>
                <Input
                    
                    className=" w-[70%] md:w-full bg-white"
                    value={nameAttr}
                    onChange={handleOnChange}
                />

                <Label className=" font-normal  text-right">Values</Label>
                <div className=" space-y-2">
                    {' '}
                    {attrValues.map((_, indexValue) =>
                       
                            <FormCreateValue
                                key={indexValue}
                                indexAttr={indexAttr}
                                indexValue={indexValue}
                                
                            />
                    )}
                </div>
            </div>

            <div className=" flex justify-center">
                {' '}
                <Button
                    onClick={handleClickNewValue}
                    className="border hover:text-white border-black bg-white text-black"
                    type="button"
                >
                    New Value <BadgePlus />
                </Button>
            </div>
            {indexAttr !== 0 && (
                <button
                    type="button"
                    className="absolute top-1 right-1  text-gray  rounded-full opacity-80 hover:opacity-100 transition"
                    onClick={() => handleRemove()}
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
}
