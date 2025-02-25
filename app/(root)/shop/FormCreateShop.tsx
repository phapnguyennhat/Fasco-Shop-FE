import { createShop } from '@/app/action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function FormCreateShop() {
    const [image, setImage] = useState<Blob>();
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setImage(file);
        }
    };

    const {toast} = useToast()
    const [loading,setLoading] = useState<boolean>(false)

    const handleSubmit  = async (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      if (!image) {
        toast({
          variant: 'destructive',
          title: "Uh oh! You have'nt uploaded image yet",
          description: 'Please upload image of shop',
        });
        return;
      }
      if(name===''){
        toast({
          variant: 'destructive',
          title: "Uh oh! You have'nt uploaded image yet",
          description: 'Please upload image of shop',
        });
        return;
      }
      
      try {
          setLoading(true)
          dispatch(setSpinner(true))
          await createShop(image, name);
         
          toast({
            description: 'Create Shop successfully.',
          });
          setName('')
          setImage(undefined)
          setLoading(false);
          dispatch(setSpinner(false))
      } catch (error: any) {
          toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: error.message,
          });
          setLoading(false);
          dispatch(setSpinner(false))
      }

    }

    return (
        <div className=" mx-5 grid grid-cols-2  md:grid-cols-4 lg:grid-cols-5">
            <form
                className=" mb-[30px]  flex flex-col items-center "
                onSubmit={handleSubmit}
            >
                <label className=" overflow-hidden px-4 sm:h-[160px] md:h-[120px] h-[100px] flex items-center justify-center  cursor-pointer mb-4 w-full border">
                    <input
                        name="file"
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {image ? (
                        <Image
                            src={URL.createObjectURL(image)}
                            alt="image"
                            width={300}
                            height={300}
                            className=" h-auto object-cover "
                        />
                    ) : (
                        <CirclePlus className="mx-auto size-full " />
                    )}
                </label>
                <Input
                    autoComplete="off"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className=" text-sm md:text-base mb-2 text-center"
                    placeholder="Shop name"
                />
                <Button
                    disabled={loading}
                    className={` text-sm md:text-base ${
                        loading && 'bg-gray-800'
                    } `}
                    type="submit"
                >
                  {loading ? 'Loading' : ' Create Shop'}
                </Button>
            </form>
        </div>
    );
}
