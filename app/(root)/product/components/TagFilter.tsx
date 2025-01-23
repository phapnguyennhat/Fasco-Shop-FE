import { FIVEMINUTES } from '@/app/common/constant';
import { createQueryString, fetcher } from '@/lib/utils';
import { Tags } from 'lucide-react';
import Link from 'next/link';
import { string } from 'zod';
import { QueryProduct } from '../page';

export default async function TagFilter({
    queryParams,
}: {
    queryParams: QueryProduct;
}) {
    const tags: { name: string }[] = await fetcher<{ name: string }[]>(
        'tag?page=1&limit=11',
        {
            method: 'GET',
            next: {
                revalidate: FIVEMINUTES,
            },
        },
    );


    const {tag: selectedTag} = queryParams

  
    return (
        <div className=' mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px]  pr-2' >
            <span className=" text-lg text-[#000] font-volkhov  "> Tags</span>
            <ul className=' flex flex-wrap gap-x-3 gap-y-2 lg:mt-[16px] ' >
                {
                    tags.map((tag, index)=>(
                        <li className={`${selectedTag===tag.name? 'text-black': 'text-[#8A8A8A]'}`}  key={index} >
                             <Link
                                    
                                    scroll= {false}
                                    replace={true}
                                    href={`?${createQueryString(
                                        'tag',
                                        tag.name,
                                        queryParams as any,
                                    )}`}
                                >
                                    {tag.name}
                                </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
