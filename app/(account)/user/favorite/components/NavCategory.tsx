import { getCategory } from '@/lib/api';
import { createQueryString, SearchParams } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface IProps {
  queryParams: SearchParams
}
export default async function NavCategory({queryParams}: IProps) {
  const selectedCategory = queryParams['category']
  const categories: ICategory[] = await getCategory()
    return (
        <li
            className={
                'group cursor-pointer relative'
            }
        >
           <div 
           className='md:w-[130px] hover:bg-black hover:text-white transition-all duration-300   px-2 group cursor-pointer  rounded-[10px] h-[36px] md:h-[42px]  lg:h-[56px] inline-flex justify-center items-center bg-gray-200 text-black'
           >
                <span> Category</span>
                <ChevronDown />
           </div>

            <ul className=" z-10 bg-white  top-[110%] w-[210px] right-0  shadow-md  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 absolute">
            {categories.map((category, index) =>(

                <li key={index} className=" pl-4 pr-1 py-2 hover:bg-gray-100">
                    <Link
                        scroll={false}
                        replace={true}
                        className="  flex justify-between  items-center"
                        href={`?${createQueryString('category',category.name, queryParams)}`}
                    >
                       <span  > {category.name}</span>
                        { selectedCategory===category.name && <Check />}
                    </Link>
                </li>
            ))}
                
            </ul>
        </li>
    );
}
