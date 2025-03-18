'use client'

import { useSelector } from 'react-redux';
import ButtonScrollUp from './ButtonScrollUp';
import { RootState } from '@/lib/store';
import Link from 'next/link';

export default function ExtraNav() {
    const isOpen = useSelector((state: RootState)=>state.extraNav.value)
    return (
        <div className={` ${isOpen? 'visible opacity-100 ': 'invisible opacity-0'} transform transition-all duration-700 ease-in-out z-20 fixed flex bottom-[40px] right-[30px] gap-3`}>
            <Link href={'/cart'}  className="  hidden md:flex w-[40px] h-[40px] xl:w-[56px] xl:h-[56px]  rounded-[10px] items-center justify-center hover:bg-black duration-300 transform transition-all ease-in-out bg-black/70">
                <img
                    src="/icons/cart.png"
                    alt="cart icon"
                    className=" w-auto h-auto"
                />
            </Link>
            <ButtonScrollUp />
        </div>
    );
}
