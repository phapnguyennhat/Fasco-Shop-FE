import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
    images: Blob[];
    setImages: Dispatch<SetStateAction<Blob[]>>;
  
}

export default function SelectImagesProduct({ images, setImages }: IProps) {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages = files.map(
            (file) => new Blob([file], { type: file.type }),
        );
       
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (indexToRemove: number) => {
        setImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove),
        );
    };

    return (
        <div className="flex flex-col items-center px-2 md:px-4 lg:px-5 border-l ">
            <label className="flex flex-col items-center justify-center cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                />
                <span className='block mt-[20px] text-sm mb-[15px] p-2 border '>
                    Choose Images
                </span>
            </label>
            <p className="text-sm text-center w-full">
              You can select multiple images
            </p>
            <p className="mb-[12px] text-center text-sm w-full">
                Format: Image
            </p>

            {/* Hiển thị ảnh đã chọn */}
            <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="w-24 h-24 relative group">
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`Selected ${index}`}
                            className="w-full h-full object-cover rounded-md"
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
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
