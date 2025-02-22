import { sizes } from '@/app/common/constant';
import { QueryProduct } from '../page';
import Link from 'next/link';
import { createQueryString } from '@/lib/utils';

export default function SizeFilter({queryParams}: {queryParams: QueryProduct}) {
    const {size: selectedSize} = queryParams


    return (
        <div className=' mb-[8px] md:mb-[14px] lg:mb-[20px] xl:mb-[28px] ' > 
            <span className=" text-lg text-[#000] font-volkhov  "> Size</span>
            <ul className=' mt-[20px] grid grid-cols-3 w-[70%] lg:w-[50%] gap-[12px] lg:mt-[16px] ' >
                {sizes.map((size, index) => (
                    <li key={index}>
                       
                            <Link  replace= {true} href={`?${createQueryString('size', size, queryParams as any)}`}
                                className={` select-none border ${selectedSize===size? 'border-black text-black': 'text-[#8A8A8A]'}    font-jost  size-[42px] flex justify-center items-center rounded-[5px]`}
                                type="submit"
                            >
                                {size}
                            </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
