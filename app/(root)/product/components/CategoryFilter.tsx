import Link from 'next/link';
import { QueryProduct } from '../page';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { createQueryString } from '@/lib/utils';

interface IProps {
    categories: ICategory[];
    queryParams: QueryProduct;
}

export default function CategoryFilter({ categories, queryParams }: IProps) {
  const {categoryName} = queryParams
    return (
      <Accordion className=' mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px] ' type="single" collapsible>
      <AccordionItem value="item-1">
          <AccordionTrigger className='  mr-[22px] text-lg text-[#000]' >Categories</AccordionTrigger>
          <AccordionContent>
              <ul className=' mt-[15px] flex flex-wrap gap-x-3 gap-y-2 ' >
                  {categories.map((category, index) => (
                      <li className={`${categoryName===category.name? 'text-black': 'text-[#8A8A8A]'}`} key={index}>
                          <Link
                              
                             
                              replace={true}
                              href={`?${createQueryString(
                                  'categoryName',
                                  category.name,
                                  queryParams as any,
                              )}`}
                          >
                              {category.name}
                          </Link>
                      </li>
                  ))}
              </ul>
          </AccordionContent>
      </AccordionItem>
  </Accordion>
    )
}
