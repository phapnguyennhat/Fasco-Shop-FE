'use client';

import Image from 'next/image';
import StarRating from './StarRating';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Cmt {
    name: string;
    cmt: string;
    starRating: number;
    job: string;
    image: string;
    id: number;
}

export default function SlideCmt() {
    const items: Cmt[] = [
        {
            name: 'James K.',
            cmt: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
            starRating: 5,
            job: 'Traveler',
            image: '/images/customer1.png',
            id: 0,
        },
        {
            name: 'Suzan B.',
            cmt: "Items That I ordered were the best investment I ever made. I can't say enough about your quality service.",
            starRating: 5,
            job: 'UI Designer',
            image: '/images/customer2.png',
            id: 1,
        },
        {
            name: 'Megen W.',
            cmt: 'Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.',
            starRating: 5,
            job: 'UI Designer',
            image: '/images/customer3.png',
            id: 2,
        },
    ];

    const [showCmtId, setShowCmtId] = useState(1);
    const rightId = showCmtId + 1 < items.length ? showCmtId + 1 : 0;
    const leftId = showCmtId - 1 >= 0 ? showCmtId - 1 : items.length - 1;

    return (
        <>
            <ul className="  relative md:mb-[380px]  lg:mb-[460px]">
                {items.map((item, index) => (
                    <CartCmt cmt={item} numCmt={items.length} showCmtId={showCmtId} key={index} />
                ) )}
            </ul>
            <div className=" inline-flex gap-4 justify-center w-full ">
                <button onClick={()=>setShowCmtId(leftId)} className=" hover:text-gray-400 transition-all duration-300 hover:scale-105  p-2 rounded-full  bg-white shadow-lg">
                    <ChevronLeft />
                </button>
                <button onClick={()=>setShowCmtId(rightId)} className=" hover:text-gray-400 transition-all duration-300  hover:scale-105 p-2 rounded-full bg-white shadow-lg">
                    <ChevronRight />
                </button>
            </div>
        </>
    );
}


function CartCmt({cmt, showCmtId, numCmt}: {cmt: Cmt, showCmtId: number, numCmt: number}){
    const rightId = showCmtId + 1 < numCmt ? showCmtId + 1 : 0;
    const leftId = showCmtId - 1 >= 0 ? showCmtId - 1 : numCmt - 1;
    const isCenter = showCmtId===cmt.id
    const isLeft= leftId ===cmt.id
    const isRight = rightId===cmt.id
    let style = 'bg-white flex absolute shadow-lg '
    if(isCenter){
        style += ' md:py-[40px] lg:py-[69px] md:px-[40px] lg:px-[50px] md:gap-[40px] lg:gap-[83px] md:w-[700px] lg:w-[864px]  -translate-x-1/2 left-1/2 z-10'
    }
    else if(isLeft){
        style+='top-[33px] md:py-[36px] lg:py-[51px] md:px-[28px] lg:px-[37px] md:gap-[50px] lg:gap-[62px] w-[646px] left-0 z-0'
    }else if (isRight){
        style +='top-[33px] md:py-[36px] lg:py-[51px] md:px-[28px] lg:px-[37px] md:gap-[50px] lg:gap-[62px] w-[646px] right-0 z-0'
    }
    return (
        <div className={`${style} transition-all duration-300   `}>
            <Image
                src={cmt.image}
                width={isCenter?263: 196}
                height={isCenter?263: 196}
                className={`${isCenter? 'size-[263px]': 'size-[196px]'} `}
                alt="avatar"
            />
            <div>
                <p className={` ${isCenter? 'lg:mb-[27px] md:mb-[18px]': 'md:mb-[14px] lg:mb-[20px]'} `}>"{cmt.cmt}"</p>
                <div className={` ${isCenter? 'lg:mb-[30px] md:mb-5': 'mb-[22px]'} `}>
                    <StarRating starRating={cmt.starRating}>
                        <Image
                            src={'/images/star-yellow.png'}
                            width={19}
                            height={19}
                            alt="star"
                            className=" w-[10px] h-[10px] md:h-[14px] md:w-[14px] lg:w-auto lg:h-auto"
                        />
                    </StarRating>
                </div>
                <div className={` border-t border-black w-[230px] ${isCenter? 'md:mb-[10px] lg:mb-[15px]': 'lg:mb-[11px]'} `}></div>
                <p className={` font-volkhov md:text-2xl lg:text-[32px] lg:leading-[32px] ${isCenter? 'md:mb-[8px] lg:mb-[13px]': 'lg:mb-[9px]'}`}>
                    {cmt.name}
                </p>
                <p>{cmt.job}</p>
            </div>
        </div>
    );
}
