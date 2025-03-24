'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useInputQuantity from '@/hooks/useInputQuantity';

interface IProps {
    maxQuantity: number;
}

export default function InputQuantity({ maxQuantity }: IProps) {
    const [quantity, setQuantity] = useState('1');
    const disable = maxQuantity <= 0;

    const { handleMinus, handlePlus, handleChange, handleOnBlur } =
        useInputQuantity({ setQuantity, maxQuantity });
    return (
        <div className=" lg:w-[128px] rounded-[4px] bg-white lg:h-[46px] flex items-center border ">
            <button
                onClick={handleMinus}
                className="pl-[12px]"
                type="button"
                disabled={disable}
            >
                <Minus />
            </button>
            <Input
                value={quantity}
                type="text"
                name="quantity"
                disabled={disable}
                onBlur={handleOnBlur}
                onChange={handleChange}
                className={`  focus-visible:ring-0 text-black border-none rounded-none h-full  text-center ${
                    disable && 'text-gray-500'
                } `}
            />
            <button
                onClick={handlePlus}
                className="pr-[12px]"
                type="button"
                disabled={disable}
            >
                <Plus />
            </button>
        </div>
    );
}
