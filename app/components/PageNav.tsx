import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function PageNav() {
    return (
        <li className=" cursor-pointer flex items-center group  relative ">
            Pages
            <ChevronDown />{' '}

            <ul className=' py-2 top-[28px] min-w-[130px] -left-[10px] shadow-md  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 absolute' >
                <li className=' px-2 hover:bg-gray-100' ><Link href={'/deals'} >Deals</Link></li>
                <li className=' px-2 hover:bg-gray-100' ><Link href={'/newArrival'}>New Arrivals</Link></li>
                
            </ul>
        </li>
    );
}
