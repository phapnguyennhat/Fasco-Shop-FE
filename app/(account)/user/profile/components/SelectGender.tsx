
import { EGender } from "@/app/common/enum";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";


interface IProps {
  form: UseFormReturn<{
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    birthday: string;
}, any, undefined>,
  gender: EGender
}
 function SelectGender({form, gender}: IProps) {
  return (
    <Select value={gender } onValueChange={value=>{form.setValue('gender', value)}} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value={EGender.MALE}>Male</SelectItem>
          <SelectItem value={EGender.FEMALE}>Female</SelectItem>
          <SelectItem value={EGender.OTHER}>Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default memo(SelectGender)
