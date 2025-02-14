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
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchParams, useQueryState } from 'nuqs';

interface IProps {
    district: IDistrict| undefined;
    queryParams: SearchParams
}
function SelectCommune({ district , queryParams }: IProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const selectedCommune = searchParams.get('commune');
    const [name, communeId] = selectedCommune?.split('-i.') || [];
    
    const communes: ICommune[]=district?.communes || []

  

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={!district} asChild>
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
                    } justify-between  selectAddr `}
                >
                    {name || 'Commune'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full  p-0">
                <Command>
                    <CommandInput placeholder="Search Commune " />
                    <CommandList>
                        <CommandEmpty>
                            Not found <br /> District.
                        </CommandEmpty>
                        <CommandGroup>
                            {communes.map((commune) => (
                                <CommandItem
                                    key={commune.id}
                                    value={commune.name}
                                    onSelect={(currentValue) => {
                                        // setValue(province.id === addressState.provinceId ? "" : province.id)
                                        router.replace(`?${createQueryString('commune', `${commune.name}-i.${commune.id}`,queryParams)}`, {scroll: false})
                                        setOpen(false);
                                    }}
                                >
                                    {commune.name}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            communeId === commune.id
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

export default React.memo(SelectCommune);
