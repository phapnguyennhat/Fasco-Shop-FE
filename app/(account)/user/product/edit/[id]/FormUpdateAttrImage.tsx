'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    newValue,
    removeAttr,
    setAttrName,
} from '@/lib/features/attrProduct/attrProductSlice';
import { RootState } from '@/lib/store';
import { BadgePlus, X } from 'lucide-react';
import { ChangeEvent, Dispatch, memo, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormUpdateValueImage from './FormUpdateValueImage';
import { UpdateAttrProductDto } from './schema';
import { ControllerRenderProps } from 'react-hook-form';

interface IProps {
    indexAttr: number;
    field: ControllerRenderProps<any, 'updateAttrProductDtos'>;
    attrValues  : IValueAttr[]
}

function FormUpdateAttrImage({ indexAttr, field, attrValues }: IProps) {
    const updateAttrProductDto = field.value[indexAttr] as UpdateAttrProductDto;
    const { updateValueAttrDtos, name } = updateAttrProductDto;

    

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUpdateProductDtos =[... field.value]
        newUpdateProductDtos[indexAttr].name = e.target.value
        field.onChange(newUpdateProductDtos)
        
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
                            valueAttr={attrValues[indexValue]}
                           
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(FormUpdateAttrImage);
