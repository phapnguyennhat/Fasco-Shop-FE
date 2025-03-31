import { Input } from '@/components/ui/input';
import { setValue } from '@/lib/features/attrProduct/attrProductSlice';
import { RootState } from '@/lib/store';
import { UpdateAttrProductDto } from '@/schema/product';
import { ChangeEvent } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
    indexAttr: number;
    indexValue: number;
    field: ControllerRenderProps<any, 'updateAttrProductDtos'>;
}

export default function FormUpdateValue({
    indexAttr,
    indexValue,
    field,
}: IProps) {
    const updateAttrProductDto = field.value[indexAttr] as UpdateAttrProductDto;
    
    const value = updateAttrProductDto.updateValueAttrDtos[indexValue].value

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newUpdateProductDtos =[... field.value] as UpdateAttrProductDto[]
        newUpdateProductDtos[indexAttr].updateValueAttrDtos[indexValue].value = e.target.value
        field.onChange(newUpdateProductDtos)
        
    };

    return (
        <div className=" flex md:justify-between items-center">
            <Input
                onChange={onChangeValue}
                value={value}
                className="  w-[70%] md:w-full  bg-white"
                placeholder="value"
            />
        </div>
    );
}
