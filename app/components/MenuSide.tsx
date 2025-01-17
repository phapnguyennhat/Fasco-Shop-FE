'use client';
import { useState } from 'react';
import { AlignJustify } from 'lucide-react'; // Nếu bạn dùng Lucide Icons
import Link from 'next/link';

export default function MenuSide() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="  lg:hidden relative">
            {/* Button mở menu */}
            <button onClick={toggleMenu}>
                <AlignJustify className="size-[20px] sm:size-[30px]" />
            </button>

            {/* Menu trượt */}
            <div
                className={`fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                {/* <button
                    className="absolute top-4 right-4 text-gray-600"
                    onClick={toggleMenu}
                >
                    ✖
                </button> */}

                <div className=" mt-3 lg:mt-6 "> 
                    <span className=" logo mx-2 sm:mx-4  ">Fasco</span>
                   <div className=' mt-2 '>
                      <ul className="flex flex-col items-start mx-2  ">
                          <li className=' border-b-2  px-4 py-3  w-full' >
                              <Link href={'/'}>Home</Link>
                          </li>
                          <li className='border-b-2 px-4 py-3  w-full' >
                              <Link href={'/'}>Deals</Link>
                          </li>
                          <li className='border-b-2 px-4 py-3  w-full' >
                              <Link href={'/'}>New Arrivals</Link>
                          </li>
                          {/* <li className=' border-b-2 px-4 py-3  w-full' >
                              <Link href={'/'}>Packages</Link>
                          </li> */}
                      </ul>
                      <div className=" flex justify-between  p-4  ">
                          <button className="button-black min-w-[110px]">Sign up</button>
                          <button className=" button-black min-w-[110px] ">Sign in</button>
                      </div>
                   </div>
                </div>
            </div>

            {/* Overlay mờ (khi menu mở) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black bg-opacity-50"
                    onClick={toggleMenu}
                ></div>
            )}
        </div>
    );
}
