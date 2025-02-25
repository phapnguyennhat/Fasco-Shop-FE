'use client'

import { useToast } from "@/hooks/use-toast";
import { createQueryString, SearchParams } from "@/lib/utils"
import { useRouter } from "next/navigation";


interface IProps {
  queryParams :SearchParams
  hasVariantSoldOut: boolean
}
export default function ButtonCheckout({queryParams, hasVariantSoldOut}: IProps) {
  const { toast } = useToast();
  const router= useRouter()


  const handleClick = () => {
      if (hasVariantSoldOut) {
          toast({
              variant: 'destructive',
              title: 'Uh oh! Order went wrong.',
              description: 'Please remove the products which are sold out ',
          });
        
      }else{
        router.push(
            `/checkout?${createQueryString(undefined, '', queryParams)}`,
        );
      }
  };

  return (
    <button onClick={handleClick} className=" bg-black flex w-full mx-auto items-center button-black justify-center lg:h-[60px] ">
      Checkout
    </button>
  )
}
