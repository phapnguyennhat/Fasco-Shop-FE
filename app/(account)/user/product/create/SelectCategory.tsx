'use client';
import { useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';

interface IProps {
    categories: ICategory[];
    field: ControllerRenderProps<any, "categoryId">
}
export default function SelectCategory({
    categories,
   field
}: IProps) {

  const [open, setOpen] = useState(false);

  const categoryIdSelected = field.value
  const categorySelected = categories.find(item=>item.id ===categoryIdSelected)
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={` w-auto ${
                    open && 'ring-1 ring-black'
                }  hover:bg-white  ${
                    categorySelected
                        ? 'text-black hover:text-black'
                        : 'text-[#8A8A8A]  hover:text-[#8A8A8A]'
                } justify-between   font-normal    `}
            >
                { categorySelected?.name || 'Category'}
                <ChevronsUpDown className="opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full  p-0">
            <Command>
                <CommandInput placeholder="Search Brands " />
                <CommandList>
                    <CommandEmpty>
                        Not found <br /> Category.
                    </CommandEmpty>
                    <CommandGroup>
                        {categories?.map((category) => (
                            <CommandItem
                                key={category.name}
                                value={category.name}
                                onSelect={(currentValue) => {
                                    field.onChange(category.id)
                                    setOpen(false);
                                }}
                            >
                                {category.name}
                                <Check
                                    className={cn(
                                        'ml-auto',
                                        field.value === category.name
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
);
}
