import { Input } from "@/components/ui/input";
import { removeValue, setValue } from "@/lib/features/attrProduct/attrProductSlice";
import { Trash2, X } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useDispatch } from "react-redux";


interface IProps {
  indexAttr: number
  indexValue: number 
 
}

export default function FormCreateValue({indexAttr,indexValue}: IProps) {

  const dispatch = useDispatch();

  const handleRemove = ()=>{
            dispatch(removeValue({ indexAttr, indexValue }));
    
  }
  
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) =>{
    dispatch(setValue({indexAttr,indexValue,value: e.target.value}))
  }
  
  return (
    <div className=" flex md:justify-between items-center">
            <Input onChange={onChangeValue}  className=" w-[70%] md:w-full  bg-white" placeholder="value" />

         


            <div className=" w-[10%] inline-flex justify-end   items-center">
                {indexValue !== 0 && (
                    <button onClick={handleRemove} type="button" className="">
                         <Trash2 size={20} />
                    </button>
                )}
            </div>
        </div>
  )
}
