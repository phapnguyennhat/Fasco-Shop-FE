'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function SlideImage() {
    const images = [
        '/images/deal2.png',
        '/images/deal3.png',
        '/images/deal2.png',
        '/images/deal3.png',
    ];
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} >
                        <Image
                            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 486px"
                            src={image}
                            alt="deal1"
                            width={372}
                            height={486}
                            className=" w-auto h-auto"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
