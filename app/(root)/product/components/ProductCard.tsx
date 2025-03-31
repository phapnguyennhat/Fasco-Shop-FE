import { Skeleton } from '@/components/ui/skeleton'

import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({product}: {product: Product}) {
  
  return (
      <li className=" w-full  hover:scale-105 transition-all duration-300">
          <Link
              className=" "
              href={`/product/${product.name.replaceAll(' ','-' ).replaceAll('/', '-')}-i.${
                product.id
            }`}
          >
              <div className="group relative">
                
                  <Image
                      width={302}
                      height={302}
                      src={product.images[0].url}
                      alt="product image"
                      className="  w-full h-auto   lg:mb-[19px]"
                  />
                  {product.pieceAvail === 0 && (
                      <p className=" absolute inset-0 flex items-center justify-center">
                          <span className=" text-white font-semibold uppercase text-sm p-3 md:p-4 lg:p-6 bg-[#B1B1B1] rounded-full">
                              Sold out
                          </span>
                      </p>
                  )}
              </div>
              <p className=" font-volkhov text-base text-black   line-clamp-1">
                  {product.name}
              </p>
              <p className="">
                 <span className=' font-jost  text-black' > $
                  {product.discountPrice > 0
                      ? product.discountPrice
                      : product.price}</span>

                  
              </p>
          </Link>
      </li>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className=" w-full h-[162px] md:h-[240px]  lg:h-[300px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80px]" />
      </div>
    </div>
  )
}