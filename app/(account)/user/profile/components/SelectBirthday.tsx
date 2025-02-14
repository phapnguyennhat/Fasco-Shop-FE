"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { memo, useState } from "react"
import { UseFormReturn } from "react-hook-form"

interface IProps {
    form: UseFormReturn<{
      name: string;
      email: string;
      phoneNumber: string;
      gender: string;
      birthday: string;
  }, any, undefined>,
  birthday: string
}

 function SelectBirthday({form, birthday }: IProps) {
  const [date, setDate] = useState<Date>()

  console.log({birthday})


  return (
    <Popover>
      <PopoverTrigger asChild>  
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={value =>{
            setDate(value)
            const formattedDate = date?.toLocaleDateString("vi-VN");
            form.setValue('birthday', formattedDate ||'')

          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default memo(SelectBirthday)