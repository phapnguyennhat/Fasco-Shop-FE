import { Input } from '@/components/ui/input';
import { setValue } from '@/lib/features/attrProduct/attrProductSlice';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/lib/store';

interface IProps {
    indexAttr: number;
    indexValue: number;
    attrValue: IValueAttr;
}

export default function FormUpdateValueImage({
    indexAttr,
    indexValue,
    attrValue,
}: IProps) {
    const dispatch = useDispatch();

    const values = useSelector((state: RootState)=>state.attrProduct.value.values)
    const value = values[indexAttr][indexValue]


    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setValue({ indexAttr, indexValue, value: e.target.value }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // upload image
        }
    };

    return (
        <div className=" flex  gap-2 items-center">
            <Input
                onChange={onChangeValue}
                className="w-[50%] bg-white"
                placeholder="value"
                value={value}
            />

            {/* Upload Image Input */}
            <label className=" lg:w-[20%] inline-flex justify-center items-center  text-sm cursor-pointer font-medium">
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <Image
                    src={attrValue.image.url}
                    alt="image"
                    width={80}
                    height={80}
                    className="object-cover size-[60px] md:size-[80px] "
                />
            </label>
        </div>
    );
}
