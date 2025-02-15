import { Skeleton } from '@/components/ui/skeleton'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductCard({product}: {product: Product}) {
  
  return (
    <li className=' w-full  hover:scale-105 transition-all duration-300'>
     <Link href={`/product/${ encodeURIComponent( product.name)}-i.${product.id}`}>
        <Image
        width={302} height={302} 
        src={product.images[0].url} alt='product image' className='  w-full h-auto   lg:mb-[19px]' />
        <p className=' font-volkhov text-base text-black   line-clamp-1' >{product.name}</p>
        <p className=' font-jost  text-black'>${product.price}</p>
     </Link>
    </li>
  )
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}