'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Router } from 'lucide-react';

import { cn, createQueryString } from '@/lib/utils';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchParams, useQueryState } from 'nuqs';

interface IProps {
    provinces: IProvince[];
    queryParams: SearchParams
}
function SelectProvince({ provinces , queryParams }: IProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const selectedProvince = searchParams.get('province');
    const [name, provinceId] = selectedProvince?.split('-i.') || [];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={` w-full ${
                        open && 'ring-1 ring-black'
                    }  hover:bg-white  ${
                        name
                            ? 'text-black hover:text-black'
                            : 'text-[#8A8A8A]  hover:text-[#8A8A8A]'
                    } justify-between   selectAddr   `}
                >
                    {name || 'City/Province'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full  p-0">
                <Command>
                    <CommandInput placeholder="Search City/Province " />
                    <CommandList>
                        <CommandEmpty>
                            Not found <br /> City/Province.
                        </CommandEmpty>
                        <CommandGroup>
                            {provinces?.map((province) => (
                                <CommandItem
                                    key={province.id}
                                    value={province.name}
                                    onSelect={(currentValue) => {
                                        // setValue(province.id === addressState.provinceId ? "" : province.id)
                                        router.replace(`?${createQueryString('province', `${province.name}-i.${province.id}`,queryParams)}`, {scroll: false})
                                        setOpen(false);
                                    }}
                                >
                                    {province.name}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            provinceId === province.id
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
