import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { ECollection } from '../common/enum';

export default function PageNav() {
    return (
        <li className=" cursor-pointer flex items-center group  relative ">
            Pages
            <ChevronDown />{' '}
            <ul className=" z-20 bg-white  top-[28px] min-w-[170px] -left-[10px] shadow-md  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 absolute">
                <li className=" p-2  hover:bg-gray-100">
                    <Link href={`/product?collection=${ECollection.DEALS}`}>
                        Deals
                    </Link>
                </li>
                <li className=" p-2 hover:bg-gray-100">
                    <Link
                        href={`/product?collection=${ECollection.NEWARRIVAL}`}
                    >
                        New Arrivals
                    </Link>
                </li>
                <li className=" p-2 hover:bg-gray-100">
                    <Link
                        href={'/category'}
                    >
                        Category & Tag
                    </Link>
                </li>
            </ul>
        </li>
    );
}
