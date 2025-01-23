import { prices } from "@/app/common/constant";
import { QueryProduct } from "../page";
import Link from "next/link";
import { createQueryString } from "@/lib/utils";

export default function PriceFilter({queryParams}: {queryParams: QueryProduct})  {
  const {minPrice, maxPrice} = queryParams
  
    return (
        <div className=" mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px] " >
            <span className=" text-lg text-[#000] font-volkhov lg:mb-[20px] "> Prices</span>
            <ul className=" text-[#8A8A8A] flex flex-col mt-[20px]  gap-y-[10px]" >
              {prices.map((price, index)=>{
                if(minPrice ==price.minPrice && maxPrice ==price.maxPrice){
                  
                  delete queryParams.minPrice
                  delete queryParams.maxPrice
                    return <li className="text-[#000]" key={ index}  >
                      <Link scroll={false} replace={true} href={`?${createQueryString(undefined,'',queryParams as any)}`}  >{price.name}</Link>
                    </li>
                }else{
                const query = {...queryParams, minPrice: price.minPrice, maxPrice: price.maxPrice}
                return <li key={index} >
                  <Link scroll={false} replace={true} href={`?${createQueryString(undefined,'',query as any)}`} >{price.name}</Link>
                </li>

                }
              })}
            </ul>
        </div>
    );
}
