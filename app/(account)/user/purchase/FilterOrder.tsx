import { SearchParams } from '@/lib/utils';
import Link from 'next/link';


interface IProps{
  queryParams: SearchParams
}
export default function FilterOrder({queryParams}: IProps) {
  const status = queryParams['status'] 
    return (
        <nav className=" mb-[30px] overflow-x-scroll scrollbar-hide w-screen md:w-[90%] lg:w-[80%]">
           <div className='  min-w-[500px] sm:w-full  grid grid-cols-5 '> <Link
                className={` ${!status && 'border-black text-black'}  hover:text-black transition-all duration-300  border-b-2 p-2   md:p-4 text-center`}
                href={'?'}
            >
                All
            </Link>
            <Link
                className={` ${status ==='pending' && 'border-black text-black'}  hover:text-black transition-all duration-300  border-b-2 p-2  md:p-4 text-center`}

                href={'?status=pending'}
            >
                Pending
            </Link>
            <Link
                className={` ${status ==='shipping' && 'border-black text-black'}  hover:text-black transition-all duration-300  border-b-2  p-2 md:p-4 text-center`}

                href={'?status=shipping'}
            >
                Shipping
            </Link>
            <Link
                className={` ${status ==='complete' && 'border-black text-black'}  hover:text-black transition-all duration-300  border-b-2  p-2 md:p-4 text-center`}

                href={'?status=complete'}
            >
                Complete
            </Link>
            <Link
                className={` ${status ==='cancel' && 'border-black text-black'}  hover:text-black transition-all duration-300  border-b-2  py-2  md:p-4 text-center`}

                href={'?status=cancel'}
            >
                Cancel
            </Link></div>
        </nav>
    );
}
