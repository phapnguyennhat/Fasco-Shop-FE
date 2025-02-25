'use client';
import { SearchParams } from '@/lib/utils';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
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
    form:UseFormReturn<{
        name: string;
        categoryName: string;
        tagNames: [string, ...string[]];
        brandId: string;
    }, any, undefined>
    categoryName: string;
}
export default function SelectCategory({
    categories,
    form,
    categoryName,
}: IProps) {

  const [open, setOpen] = useState(false);
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={` w-[40%] ${
                    open && 'ring-1 ring-black'
                }  hover:bg-white  ${
                    categoryName
                        ? 'text-black hover:text-black'
                        : 'text-[#8A8A8A]  hover:text-[#8A8A8A]'
                } justify-between   font-normal    `}
            >
                { categoryName || 'Category'}
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
                                    form.setValue('categoryName', category.name);
                                    setOpen(false);
                                }}
                            >
                                {category.name}
                                <Check
                                    className={cn(
                                        'ml-auto',
                                        categoryName === category.name
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
