import { collections } from '@/app/common/constant';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { QueryProduct } from '../page';
import Link from 'next/link';
import { createQueryString } from '@/lib/utils';
export default function CollectionFilter({
    queryParams,
}: {
    queryParams: QueryProduct;
}) {
    const { collection: selectedCollection } = queryParams;
    return (
        <Accordion className=' mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px] ' type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className=" text-lg mr-[22px] text-[#000]">
                    Collections
                </AccordionTrigger>
                <AccordionContent>
                    <ul className=' mt-[15px] flex flex-col gap-x-3 gap-y-2' >
                        {collections.map((collection, index) => (
                            <li
                                className={`${
                                    selectedCollection === collection.value
                                        ? 'text-black'
                                        : 'text-[#8A8A8A]'
                                }`}
                                key={index}
                            >
                              <Link
                                    
                                    replace={true}
                                    href={`?${createQueryString(
                                        'collection',
                                        collection.value,
                                        queryParams as any,
                                    )}`}
                                >
                                    {collection.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
