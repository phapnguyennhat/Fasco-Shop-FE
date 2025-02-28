'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ChangeEvent,  memo } from 'react';
import FormUpdateValueImage from './FormUpdateValueImage';
import { UpdateAttrProductDto } from './schema';
import { ControllerRenderProps } from 'react-hook-form';
import { UpdateValueImage } from './FormUpdateProduct';

interface IProps {
    indexAttr: number;
    field: ControllerRenderProps<any, 'updateAttrProductDtos'>;
    valueImages: UpdateValueImage[]
    handleChangeValueImage: (index: number, file: Blob) => void
}

function FormUpdateAttrImage({ indexAttr, field, valueImages, handleChangeValueImage }: IProps) {
    const updateAttrProductDto = field.value[indexAttr] as UpdateAttrProductDto;
    const { updateValueAttrDtos, name } = updateAttrProductDto;

    

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUpdateAttrProductDtos =[... field.value]
        newUpdateAttrProductDtos[indexAttr].name = e.target.value
        field.onChange(newUpdateAttrProductDtos)
        
    };

    return (
        <div className="relative  bg-gray-100 p-4  ">
            <div className="mb-[20px]">Attribute {indexAttr + 1}</div>
            <div className="  mb-4  grid gap-2 items-center  grid-cols-[50px_auto]       md:grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                <Label className=" font-normal  md:text-right">Name</Label>
                <Input
                    className=" bg-white"
                    value={name}
                    onChange={handleOnChange}
                />

                <Label className=" font-normal  md:text-right">Values</Label>
                <div className=" space-y-2">
                    {updateValueAttrDtos.map((_, indexValue) => (
                        <FormUpdateValueImage
                            key={indexValue}
                            indexAttr={indexAttr}
                            indexValue={indexValue}
                            field={field}
                            valueImage={valueImages[indexValue]}
                            handleChangeValueImage={handleChangeValueImage}
                           
                           
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(FormUpdateAttrImage);
