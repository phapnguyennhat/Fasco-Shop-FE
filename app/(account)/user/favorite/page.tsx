import Link from 'next/link';

export default function Favorite() {
    return (
        <main className=' flex-1' >
            <ul className="   items-center flex justify-center  gap-3">
                <li className=" min-w-[100px]">
                    <Link
                       className='w-[100px] rounded-[10px] lg:h-[56px] inline-flex justify-center items-center bg-gray-200 text-black'
                        href={'?filter=all'}
                        scroll={false}
                        replace={true}
                    >
                        All
                    </Link>
                </li>
                <li className=" min-w-[100px]">
                    <Link
                        className={`${
                            true
                                ? 'button-black'
                                : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                        }  inline-flex justify-center items-center w-full lg:h-[56px]   transform transition-all duration-300  `}
                        href={'?filter=available'}
                        scroll={false}
                        replace={true}
                    >
                        Available
                    </Link>
                </li>

                <li className=" min-w-[100px]">
                    <Link
                        className={`${
                            true
                                ? 'button-black'
                                : 'hover:bg-gray-200  py-2 px-2 lg:px-4 rounded-[10px]'
                        }  inline-flex justify-center items-center w-full lg:h-[56px]   transform transition-all duration-300  `}
                        href={'?filter=discount'}
                        scroll={false}
                        replace={true}
                    >
                        Discount
                    </Link>
                </li>
            </ul>
        </main>
    );
}
