import { createQueryString } from '@/lib/utils';
import Link from 'next/link';
import { QueryProduct } from '../page';

export default  function TagFilter({
    queryParams,
    tags
}: {
    queryParams: QueryProduct;
    tags: {name: string}[]
}) {
   
    const {tag: selectedTag} = queryParams

    return (
        <div className='   pr-2' >
            <span className=" text-lg text-[#000] font-volkhov  "> Tags</span>
            <ul className=' flex flex-wrap gap-x-3 gap-y-2 lg:mt-[16px] ' >
                {
                    tags.map((tag, index)=>(
                        <li className={`${selectedTag===tag.name? 'text-black': 'text-[#8A8A8A]'}`}  key={index} >
                             <Link
                                    
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
