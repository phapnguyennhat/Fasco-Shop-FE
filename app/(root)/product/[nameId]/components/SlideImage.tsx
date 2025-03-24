'use client';

import { setShowImage } from '@/lib/features/ImageProduct/imageProductSlice';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

interface IProps {
    images: ImageFile[];
}
export default function SlideImage({ images }: IProps) {
    const dispatch = useDispatch();

    return (
        <ul className=" order-2 xl:order-1   flex flex-row xl:flex-col overflow-y-scroll scrollbar-hide gap-x-2   gap-y-[10px]">
            {images.map((image, index) => (
                <li
                    onMouseEnter={() => dispatch(setShowImage(image.url))}
                    key={index}
                    className="  transition-all duration-300 border border-white hover:border-black "
                >
                    <Image
                        src={image.url}
                        width={70}
                        height={70}
                        alt="image nav"
                        className=" h-auto w-[70px]"
                    />
                </li>
            ))}
        </ul>
    );
}
