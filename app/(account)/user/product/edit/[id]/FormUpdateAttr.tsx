'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAttrName } from "@/lib/features/attrProduct/attrProductSlice"
import { RootState } from "@/lib/store"
import { ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import FormUpdateValue from "./FormUpdateValue"

interface IProps {
  indexAttr: number,
  attrProduct: IAttrProduct
}

export default function FormUpdateAttr({indexAttr, attrProduct}: IProps) {
  const{valueAttrs} = attrProduct
  const nameAttr = useSelector(
      (state: RootState) => state.attrProduct.value.nameAttrs[indexAttr],
  );
  const attrValues = useSelector((state: RootState)=>state.attrProduct.value.values[indexAttr])

  const dispatch = useDispatch()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAttrName({ indexAttr, attrName: e.target.value }));
    };


    return (
        <div className="relative  bg-gray-100 p-4  ">
            <div className="mb-[20px]">Attribute {indexAttr + 1}</div>
            <div className="  mb-4  grid gap-2 items-center  grid-cols-[50px_auto]       md:grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                <Label className=" font-normal  md:text-right">Name</Label>
                <Input
                    className=" bg-white"
                    value={nameAttr}
                    onChange={handleOnChange}
                />

                <Label className=" font-normal  md:text-right">Values</Label>
                <div className=" space-y-2">
                    {attrValues.map((_, indexValue) => (
                        <FormUpdateValue
                            key={indexValue}
                            indexAttr={indexAttr}
                            indexValue={indexValue}
                            attrValue={valueAttrs[indexValue]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
