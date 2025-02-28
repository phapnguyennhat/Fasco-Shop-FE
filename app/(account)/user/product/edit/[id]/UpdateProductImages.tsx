'use client';

import { CirclePlus, X } from 'lucide-react';
import { UpdateProductImage } from './FormUpdateProduct';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo } from 'react';

interface IProps {
    productImages: UpdateProductImage[]
    setProductImages: Dispatch<SetStateAction<UpdateProductImage[]>>
}
export default function UpdateProductImages({ productImages, setProductImages }: IProps) {
    const showProductImages = useMemo(()=>{
        return productImages.filter(item =>! item.isDelete)
    },[productImages])

    const removeImage = (index: number) => {
        setProductImages((prev)=>{
            const newProductImages = [...prev]
            const productImage = newProductImages[index]
            if(productImage){
                productImage.isDelete= true
                if(!productImage.id){
                    return newProductImages.filter(item => item.url!== productImage.url)
                }
            }
            return newProductImages
        })
    };

    

    const handleChangeProductImage = (index: number, file:Blob) =>{
        setProductImages(prev=>{
            const newProductImages = [...prev]
            const productImage = newProductImages[index]
            if(productImage){
                productImage.file=file
                productImage.url = URL.createObjectURL(file)
            }

            return newProductImages
        })
    }

    const handleImageChange =async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];
        if (file) {
            handleChangeProductImage(index, file)
        }
    };

    const handleAddImage = (e:ChangeEvent<HTMLInputElement>) =>{
        const files = Array.from(e.target.files || []);
        const newImages: UpdateProductImage[] = files.map(file=>({id: undefined, url: URL.createObjectURL(file), file, isDelete: false}))
        setProductImages(prev=>[...prev, ...newImages])
    }

    return (
        <div className="     flex flex-col ">
            <h3 className=" text-center font-volkhov text-lg sm:text-xl md:text-2xl">
                Product Images
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-3 md:gap-4">
                {productImages.map(
                    (productImage, index) =>
                        !productImage.isDelete && (
                            <div
                                key={index}
                                className=" size-[60px] md:size-[80px] relative group"
                            >
                                <label className=" cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageChange(e, index)
                                        }
                                        className="hidden"
                                    />
                                    <img
                                        src={productImage.url}
                                        alt={`Selected ${productImage.id}`}
                                        className="w-full border h-full object-cover "
                                    />
                                </label>
                                {showProductImages.length !== 1 && (
                                    <button
                                        type="button"
                                        className="absolute -top-[10%] -right-[10%] bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                                        onClick={() => removeImage(index)}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ),
                )}
                <label className=' border cursor-pointer' >
                    <input onChange={handleAddImage} name="file" hidden multiple type="file" accept="image/*" />
                    <CirclePlus className="mx-auto size-full " />
                </label>
            </div>
        </div>
    );
}
