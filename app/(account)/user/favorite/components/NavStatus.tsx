import { createQueryString, SearchParams } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface IProps {
  queryParams: SearchParams
}
export default function NavStatus({queryParams}: IProps) {
  const status = queryParams['status']
    return (
        <li
            className={
                'group cursor-pointer relative '
            }
        >
            <div className='md:w-[130px] hover:bg-black hover:text-white transition-all duration-500   px-2 group cursor-pointer  rounded-[10px] h-[36px] md:h-[42px]  lg:h-[56px] inline-flex justify-center items-center bg-gray-200 text-black' >
              <span className='  ' > Status</span>
              <ChevronDown />
            </div>

            <ul className=" z-10  bg-white  top-[116%]   min-w-[130px] left-[1/2] shadow-md  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500 absolute">
                <li className=" pl-4 pr-1 py-2 hover:bg-gray-100">
                    <Link
                        scroll={false}
                        replace={true}
                        className=" flex justify-between  items-center"
                        href={`?${createQueryString('status','available', queryParams)}`}
                    >
                       <span> Available</span>
                        { status==='available' && <Check />}
                    </Link>
                </li>
                <li className="  pl-4 pr-1 py-2 hover:bg-gray-100">
                <Link
                        className=" flex justify-between  items-center"
                        scroll={false}
                        replace={true}
                        href={'?status=soldout'}
                    >
                        Sold out
                        { status==='soldout' && <Check />}
                    </Link>
                </li>
            </ul>
        </li>
    );
}
