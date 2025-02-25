'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Router } from 'lucide-react';

import { cn, createQueryString, SearchParams } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { useRouter, useSearchParams } from 'next/navigation';

interface IProps {
    province: IProvince| undefined;
    queryParams: SearchParams
}
function SelectProvince({ province , queryParams }: IProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const selectedDistrict = searchParams.get('district');
    const [name, provinceId] = selectedDistrict?.split('-i.') || [];
    
    const districts: IDistrict[]=province?.districts || []

  
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={!province} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={` w-full ${
                        open && 'ring-1 ring-black'
                    }  hover:bg-white  ${
                        name
                            ? 'text-black hover:text-black'
                            : 'text-[#8A8A8A] hover:text-[#8A8A8A]'
                    } justify-between selectAddr `}
                >
                    {name || 'District'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full  p-0">
                <Command>
                    <CommandInput placeholder="Search District " />
                    <CommandList>
                        <CommandEmpty>
                            Not found <br /> District.
                        </CommandEmpty>
                        <CommandGroup>
                            {districts.map((district) => (
                                <CommandItem
                                    key={district.id}
                                    value={district.name}
                                    onSelect={(currentValue) => {
                                        // setValue(province.id === addressState.provinceId ? "" : province.id)
                                        router.replace(`?${createQueryString('district', `${district.name}-i.${district.id}`,queryParams)}`, {scroll: false})
                                        setOpen(false);
                                    }}
                                >
                                    {district.name}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            provinceId === province?.id
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

export default React.memo(SelectProvince);
