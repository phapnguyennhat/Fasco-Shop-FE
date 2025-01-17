'use client';

import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

import Image from 'next/image';
import { useRef } from 'react';
import StarRating from './StarRating';

interface Cmt {
    name: string;
    cmt: string;
    starRating: number;
    job: string;
    image: string;
    id: number;
}

export default function SlideCmtPhone() {
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

    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    return (
        <Carousel
            // plugins={[plugin.current]}
            className=" max-w-sm "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {items.map((item, index) => (
                    <CarouselItem key={ index}>
                        <CmtCard cmt={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

function CmtCard({ cmt }: { cmt: Cmt }) {
    return (
        <div className=" flex items-center gap-4 mx-4  ">
            <Image
                src={cmt.image}
                width={60}
                height={60}
                alt="avatar"
                className=" size-auto"
            />

            <div>
               <div className=' flex items-center justify-between mb-1 '>
                    <p className='text-base font-medium' > {cmt.name}</p>
                    <p className=' text-sm' >{cmt.job}</p>
               </div>
                <p className="text-sm mb-1">"{cmt.cmt}"</p>
                <div className={``}>
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
            </div>
        </div>
    );
}
