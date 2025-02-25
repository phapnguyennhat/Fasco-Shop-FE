'use client'
import { SearchParams } from "@/lib/utils"
import { useState } from "react";
import { UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";


interface IProps {
    brands: IBrand[];
    form:UseFormReturn<{
        name: string;
        categoryName: string;
        tagNames: [string, ...string[]];
        brandId: string;
    }, any, undefined>
    brandId: string;
}

export default  function SelectBrand({brands, brandId, form}: IProps) {
      const [open, setOpen] = useState(false);
  const selectedBrand = brands.find(item=>item.id===brandId)

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
                      selectedBrand?.name
                          ? 'text-black hover:text-black'
                          : 'text-[#8A8A8A]  hover:text-[#8A8A8A]'
                  } justify-between    font-normal   `}
              >
                  {selectedBrand?.name || 'Brand'}
                  <ChevronsUpDown className="opacity-50" />
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full  p-0">
              <Command>
                  <CommandInput placeholder="Search Brands " />
                  <CommandList>
                      <CommandEmpty>
                          Not found <br /> Brand.
                      </CommandEmpty>
                      <CommandGroup>
                          {brands?.map((brand) => (
                              <CommandItem
                                  key={brand.id}
                                  value={brand.name}
                                  onSelect={(currentValue) => {
                                      form.setValue('brandId', brand.id);
                                      setOpen(false);
                                  }}
                              >
                                  {brand.name}
                                  <Check
                                      className={cn(
                                          'ml-auto',
                                          brandId === brand.id
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
