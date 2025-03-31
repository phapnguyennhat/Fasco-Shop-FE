'use client';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { isErrorResponse } from '@/lib/utils';
import { updateShop } from '@/APIService/shop/action';

interface IProps {
    setOpenEdit: Dispatch<SetStateAction<boolean>>;
    brand: IBrand;
}

export default function FormUpdateShop({ brand, setOpenEdit }: IProps) {
    const [name, setName] = useState(brand.name);
    const [image, setImage] = useState<Blob>();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name === '') {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong",
                description: 'Name is required',
            });
            return;
        }

        
            setLoading(true);
            dispatch(setSpinner(true));
            const response =await updateShop(brand.id, name, image);

            if(isErrorResponse(response)) {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: response.message,
                });
            }else{
                toast({
                    description: 'Create Shop successfully.',
                });
                setOpenEdit(false);
            }
            setLoading(false);
            dispatch(setSpinner(false));
       
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <li>
            <form
                className=" mb-[30px]  flex flex-col items-center "
                onSubmit={handleSubmit}
            >
                <label className=" overflow-hidden px-4 sm:h-[100px] md:h-[120px] h-[70px] flex items-center justify-center  cursor-pointer mb-2 w-full border">
                    <input
                        name="file"
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {
                        <Image
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : brand.image.url
                            }
                            alt="image"
                            width={300}
                            height={300}
                            className=" h-auto object-cover "
                        />
                    }
                </label>
                <Input
                    autoComplete="off"
                    required
                    autoFocus
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" text-sm md:text-base mb-2 text-center"
                    placeholder="Shop name"
                />
                <div className=" inline-flex items-center gap-1 md:gap-2 lg:gap-3">
                    <button
                        disabled={loading}
                        className={`px-2 md:px-4 h-7 md:h-9 rounded-md bg-black text-white font-medium text-xs md:text-sm  ${
                            loading && 'bg-gray-800'
                        } `}
                        type="submit"
                    >
                        {loading ? 'Loading' : ' Update'}
                    </button>

                    <button
                        onClick={() => setOpenEdit(false)}
                        disabled={loading}
                        className=" bg-white text-xs md:text-sm px-2 md:px-4  hover:bg-red-500 hover:text-white hover:border-red-500 font-medium rounded-md h-7 md:h-9   border border-black  text-black   "
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </li>
    );
}
