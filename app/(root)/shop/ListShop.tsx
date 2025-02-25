'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FormCreateShop from './FormCreateShop';
import { ERole } from '@/app/common/enum';
import Image from 'next/image';
import ShopCard from './ShopCard';
import ShopCardAdmin from './ShopCardAdmin';

interface IProps {
    groupedShop: Record<string, IBrand[]>;
    count: number;
    role?: ERole
}

export default function ListShop({ groupedShop, count, role }: IProps) {
    const chars = Object.keys(groupedShop);
    // const chars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const [activeLetter, setActiveLetter] = useState(chars[0]);
    const letterRefs = useRef<Record<string, HTMLLIElement >>({});

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80% 0px', // Điều chỉnh vị trí trigger
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLetter(entry.target.getAttribute('data-letter') ||'');
                }
            });
        }, observerOptions);

        Object.keys(letterRefs.current).forEach((key) => {
            observer.observe(letterRefs.current[key]);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    

    return (
        <>
            <section className=" mb-[18px] md:mb-[30px]   sticky bg-white top-[74px] md:top-[100px] lg:top-[136px] z-10 max-w-[1280px]   xl:mx-auto  ">
                <div className=" mx-5  border-y">
                    <h6 className=" mt-1 text-xs ">Show {count} shops</h6>
                    <div className="  overflow-x-scroll scrollbar-hide w-full ">
                        {' '}
                        <ul
                            className={`w-auto  flex  ${
                                chars.length <= 8 && 'justify-center'
                            } md: ${chars.length <= 17 && 'justify-center'}   
                            lg: ${chars.length <= 22 && 'justify-center'}  
                             text-gray-400 text-lg md:text-xl xl:justify-center`}
                        >
                            {chars.map((char, index) => (
                                <li className=" px-4 py-2" key={index}>
                                    <Link
                                        replace={true}
                                        href={`#${char}`}
                                        className={`cursor-pointer ${
                                            activeLetter === char
                                                ? 'text-black '
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {char}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="max-w-[1280px]   xl:mx-auto ">
                {role === ERole.ADMIN && <FormCreateShop />}

                <ul className="mx-5">
                    {chars.map((char, index) => (
                        <li
                            key={index}
                            className=" mb-[30px]"
                            id={char}
                            data-letter={char}
                            ref={(el) => {
                                if (el) {
                                    letterRefs.current[char] = el;
                                }
                            }}
                        >
                            <div
                                className=" mb-[12px] md:mb-[20px] text-lg md:text-xl lg:
                            text-[24px] text-black"
                            >
                                {char}
                            </div>
                            <ul className=" grid gap-[12px] lg:gap-[20px] grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                                {groupedShop[char].map((brand, index) =>
                                    role === ERole.ADMIN ? (
                                        <ShopCardAdmin key={index} brand={brand}  />
                                    ) : (
                                        <ShopCard key={index} brand={brand} />
                                    ),
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
