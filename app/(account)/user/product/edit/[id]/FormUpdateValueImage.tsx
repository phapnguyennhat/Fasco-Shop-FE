import { Input } from '@/components/ui/input';
import { setValue } from '@/lib/features/attrProduct/attrProductSlice';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/lib/store';
import { ControllerRenderProps } from 'react-hook-form';
import { UpdateAttrProductDto } from './schema';

interface IProps {
    indexAttr: number;
    indexValue: number;
    valueAttr: IValueAttr
    field: ControllerRenderProps<any, 'updateAttrProductDtos'>;
}

export default function FormUpdateValueImage({
    indexAttr,
    indexValue,
    valueAttr,
    field
}: IProps) {

    const updateAttrProductDto = field.value[indexAttr] as UpdateAttrProductDto;
    
    const value = updateAttrProductDto.updateValueAttrDtos[indexValue].value

    


    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newUpdateProductDtos =[... field.value] as UpdateAttrProductDto[]
        newUpdateProductDtos[indexAttr].updateValueAttrDtos[indexValue].value = e.target.value
        field.onChange(newUpdateProductDtos)
        
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
                    src={valueAttr?.image?.url}
                    alt="image"
                    width={80}
                    height={80}
                    className="object-cover size-[60px] md:size-[80px] "
                />
            </label>
        </div>
    );
}
