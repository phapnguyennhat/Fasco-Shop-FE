import { ERole } from '@/app/common/enum'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { delay } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import CategoryAdmin from './CategoryAdmin'
import { getProfile } from '@/API/user/query'
import { getCategory } from '@/API/category/query'

export default async function ListCategory() {
  const [user, categories] = await Promise.all([getProfile(), getCategory()])

  // await delay(5000)
  
  return (
      <section className=" section-page_home mb-[30px] ">
          <h3 className=" font-volkhov text-2xl text-center mb-[12px] ">
              Category
          </h3>

          <ul className=" px-4 mx-auto gap-x-2 gap-y-1 max-w-[1000px] grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4">
              {categories.map((category) =>
                  user?.role === ERole.ADMIN ? (
                      <CategoryAdmin key={category.name} category={category} />
                  ) : (
                      <li
                          className=" inline-flex items-center"
                          key={category.name}
                      >
                          <Link
                              className="hover:underline"
                              href={`product?categoryName=${category.name}`}
                          >
                              {category.name}
                          </Link>
                      </li>
                  ),
              )}
          </ul>
      </section>
  );
}

export function SkeletonListCategory (){
  return (
    <section className=' section-page_home mb-[30px]' >
      <h3 className=' font-volkhov text-2xl text-center mb-[12px]' >Category</h3>

      <ul className=' px-4  gap-y-1 gap-x-2 mx-auto  max-w-[800px] grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4'   >
        {
          Array.from({length: 12}).map((_,index)=>(
            <li key={index} >
              <Skeleton className=' w-[90%] h-5' ></Skeleton>
            </li>
          ))
        }
      </ul>
    </section>
  )
}
