import Image from 'next/image';
import React from 'react';

export default function Policy() {
    const items = [
        {
            image: '/icons/high-quality.png',
            title: 'High Quality',
            description: ' Crafted from top materials',
        },
        {
            image: '/icons/warrany.png',
            title: 'Warrany Protection',
            description: 'Over 2 years',
        },
        {
            image: '/icons/free-ship.png',
            title: 'Free Shipping',
            description: 'Order over 150 $',
        },
        {
            image: '/icons/support.png',
            title: '24/7 Support',
            description: 'Dedicated support',
        },
    ];

    return (
        <section className=" section-page_home lg:mb-[150px]">
            <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3 ml-6 md:ml-9 md:gap-y-6    my-[40px] md:my-[56px] lg:my-[72px]">
                {items.map((item, index) => (
                    <li key={index} className="flex items-c enter gap-4 md:gap-[3px] ">
                        <Image
                            src={item.image}
                            width={ 50}
                            height={50}
                            alt="high-quality icon"
                            className=" size-[50px]"
                        />
                        <div className=" ">
                            <p className=" font-medium  text-lg lg:text-[20px]">
                                {item.title}
                            </p>
                            <p className=" lg:text-base ">{item.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
