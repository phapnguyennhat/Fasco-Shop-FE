import Link from 'next/link';
import { QueryProduct } from '../page';

import { createQueryString, fetcher } from '@/lib/utils';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { FIVEMINUTES } from '@/app/common/constant';

export default async function BrandFilter({
    queryParams,
}: {
    queryParams: QueryProduct;
}) {

    const brands = await fetcher<{name: string}[]>('brand', {
        method:'GET',
        next: {
            revalidate: FIVEMINUTES
        }
    })

    const {brandName} = queryParams
   

    return (
        <Accordion className=' mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px] ' type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className='  mr-[22px] text-lg text-[#000]' >Brands</AccordionTrigger>
                <AccordionContent>
                    <ul className=' mt-[15px] flex flex-wrap gap-x-3 gap-y-2 ' >
                        {brands.map((brand, index) => (
                            <li className={`${brandName===brand.name? 'text-black': 'text-[#8A8A8A]'}`} key={index}>
                                <Link
                                    
                                    scroll= {false}
                                    replace={true}
                                    href={`?${createQueryString(
                                        'brandName',
                                        brand.name,
                                        queryParams as any,
                                    )}`}
                                >
                                    {brand.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
