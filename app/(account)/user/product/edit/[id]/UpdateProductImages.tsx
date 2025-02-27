'use client';

import { X } from 'lucide-react';

interface IProps {
    images: ImageFile[];
}
export default function UpdateProductImages({ images }: IProps) {
    const removeImage = (index: number) => {};

    return (
        <div className='     flex flex-col '>
            <h3 className=' text-center font-volkhov text-lg sm:text-xl md:text-2xl' >Product Images</h3>
            <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-3 md:gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className=" size-[60px] md:size-[80px] relative group"
                    >
                        <label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                            <img
                                src={image.url}
                                alt={`Selected ${index}`}
                                className="w-full border h-full object-cover "
                            />
                        </label>
                        <button
                            type="button"
                            className="absolute -top-[10%] -right-[10%] bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                            onClick={() => removeImage(index)}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
