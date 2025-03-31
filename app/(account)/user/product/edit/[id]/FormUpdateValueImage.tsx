import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import { ControllerRenderProps } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { UpdateValueImage } from './FormUpdateProduct';
import { UpdateAttrProductDto } from '@/schema/product';

interface IProps {
    indexAttr: number;
    indexValue: number;
    field: ControllerRenderProps<any, 'updateAttrProductDtos'>;
    valueImage: UpdateValueImage
    handleChangeValueImage: (index: number, file: Blob) => void

}

export default function FormUpdateValueImage({
    indexAttr,
    indexValue,
    field,
    valueImage,
    handleChangeValueImage
}: IProps) {

    const updateAttrProductDto = field.value[indexAttr] as UpdateAttrProductDto;
    
    const value = updateAttrProductDto.updateValueAttrDtos[indexValue].value

    const {toast} = useToast()
    const dispatch = useDispatch()
    


    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const newUpdateProductDtos =[... field.value] as UpdateAttrProductDto[]
        newUpdateProductDtos[indexAttr].updateValueAttrDtos[indexValue].value = e.target.value
        field.onChange(newUpdateProductDtos)
        
    };

    const handleImageChange =async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
           handleChangeValueImage(indexValue, file)
        }
    };

    return (
        <div className=" flex  gap-2 items-center">
            <Input
                onChange={onChangeValue}
                className="flex-1 bg-white"
                placeholder="value"
                value={value}
            />

            {/* Upload Image Input */}
            <label className=" size-[60px] md:size-[80px] inline-flex justify-center items-center  text-sm cursor-pointer font-medium">
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <Image
                    src={valueImage.url}
                    alt="image"
                    width={80}
                    height={80}
                    className="object-cover size-[60px] md:size-[80px] "
                />
            </label>
        </div>
    );
}
