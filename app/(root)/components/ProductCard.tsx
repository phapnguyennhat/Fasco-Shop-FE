import Image from 'next/image';
import { formatNumber } from '@/lib/utils';
import StarRating from './StarRating';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {

    
    return (
        <Link
        href={`/product/${product.name.replaceAll(' ', '-')}-i.${
            product.id
        }`}
        
         className="  p-[8px] md:p-[16px] lg:p-[25px] bg-white  shadow-md ">
            <Image
                src={product.images[0].url}
                width={366}
                height={244}
                alt={product.name}
                className="h-auto w-auto rounded-[10px] mb-[12px]  "
            />
            <div className=" flex  justify-between items-center  mb-[1px] ">
                <p className=" font-medium text-xs md:text-base lg:text-[20px] lg:leading-[20px] line-clamp-1 w-full md:max-w-[75%]  ">
                    {product.name}
                </p>
              <div className=' hidden md:block'>
                  <StarRating  starRating={product.starRating}>
                            <Image
                                src={'/images/star-yellow.png'}
                                width={19}
                                height={19}
                                alt="star"
                                className=' w-[10px] h-[10px] md:h-[14px] md:w-[14px] lg:w-auto lg:h-auto'
                            />
                  </StarRating>
              </div>
                
            </div>
            <p className=" text-[10px] sm:text-[12px] font-medium text-[#8A8A8A]  mb-0 md:mb-[10px] lg:mb-[25px]">
                {product.user.name}
            </p>
            <p className=" text-[10px] sm:text-[12px] font-medium mb-0 md:mb-[10px] lg:mb-[25px]">
                ({formatNumber(product.reviewNumber)}) Customer Reviews
            </p>
            <div>
                <p className=' font-medium  md:text-lg lg:text-[24px]' >${product.discountPrice >0? product.discountPrice:   product.price}</p>
                {product.pieceAvail<=10 && <p className=' text-[#FF4646] lg:text-[12px]' >Almost Sold out</p>}
            </div>
        </Link>
    );
}

export function SkeletonProductCard ()  {
    return (
        <div className=" flex flex-col gap-y-2  p-[8px] md:p-[16px] lg:p-[25px] bg-white  ">
            <Skeleton className=' w-full h-[177px] md:h-[212px]  lg:h-[366px]' ></Skeleton>
            <Skeleton className='h-[20px]  w-full md:max-w-[75%]  ' />
                
            <Skeleton className='  mb-0 md:mb-[10px] lg:mb-[25px] w-[90%] h-[10px] sm:h-[12px] md:h-[18px]' />
        </div>
    );
}
