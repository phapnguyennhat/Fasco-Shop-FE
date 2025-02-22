'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { newValue, removeAttr, setAttrName } from "@/lib/features/attrProduct/attrProductSlice"
import { RootState } from "@/lib/store"
import { BadgePlus, X } from "lucide-react"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux"
import FormCreateValueImage from "./FormCreateValueImage"

interface IProps {
  indexAttr: number,
  valueImages: Blob[],
  setValueImages:  Dispatch<SetStateAction<Blob[]>>
}

export default function FormCreateAttrImage({indexAttr, valueImages, setValueImages}: IProps) {
  const attrValues = useSelector((state: RootState)=>state.attrProduct.value.values[indexAttr])
  const nameAttr = useSelector((state: RootState)=>state.attrProduct.value.nameAttrs[indexAttr])
  const dispatch = useDispatch()


   const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
       dispatch(setAttrName({ indexAttr, attrName: e.target.value }));
   };

   const handleClickNewValue = () => {
       dispatch(newValue({ indexAttr }));
   };

   const handleRemove = () => {
       dispatch(removeAttr({ indexAttr }));
   };


  return (
    <div className="relative  bg-gray-100 p-4  ">
            <div>Attribute {indexAttr + 1}</div>
            <div className="  mb-4  grid gap-2 items-center  grid-cols-[80px_auto] lg:grid-cols-[152px_auto] gap-x-[20px] ">
                <Label className=" font-normal  text-right">Name</Label>
                <Input
                    className=" bg-white"
                    value={nameAttr}
                    onChange={handleOnChange}
                    required
                />

                <Label className=" font-normal  text-right">Values</Label>
                <div className=" space-y-2">
                    {attrValues.map((_, indexValue) =>
                       
                          <FormCreateValueImage key={indexValue} indexAttr={indexAttr} indexValue={indexValue} valueImages={valueImages} setValueImages={setValueImages} />
                    )}
                </div>
            </div>

            <div className=" flex justify-center">
                {' '}
                <Button
                    disabled = {attrValues.length ===50}
                    onClick={handleClickNewValue}
                    className="border hover:text-white border-black bg-white text-black"
                    type="button"
                >
                 <BadgePlus />   New Value ({attrValues.length}/50)
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
  )
}
