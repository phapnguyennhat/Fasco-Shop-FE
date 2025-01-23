import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Fallback } from '@radix-ui/react-avatar'
import Image from 'next/image'
import React from 'react'

export default function ProductCard({product}: {product: Product}) {
  return (
    <li className=' '>
      <Image 
      width={302} height={302} 
      src={product.images[0].url} alt='product image' className='size-auto lg:mb-[19px]' />
      <p className=' font-volkhov text-base text-black   line-clamp-1' >{product.name}</p>
      <p className=' font-jost  text-black'>${product.price}</p>
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