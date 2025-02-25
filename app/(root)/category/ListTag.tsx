import { Skeleton } from '@/components/ui/skeleton'
import { getTags } from '@/lib/api'
import { delay } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default async function ListTag() {

  const tags = await getTags()
  // await delay(5000)
  return (
      <section className=" section-page_home mb-[30px]">
          <h3 className=" font-volkhov text-2xl text-center mb-[12px] ">
              Tag
          </h3>

          <ul className=" px-4 mx-auto gap-y-1 gap-x-2 max-w-[800px] grid grid-cols-3 md:grid-cols-4">
              {tags.map((tag) => (
                  <li key={tag.name}><Link className='hover:underline' href={`product?tag=${tag.name}`}>{tag.name}</Link></li>
              ))}
          </ul>
      </section>
  );
}

export function SkeletonListTag (){
 return  <section className=' section-page_home mb-[30px] ' >
      <h3 className=' font-volkhov text-2xl text-center mb-[12px]' >Tag</h3>

      <ul className=' px-4  gap-y-1 gap-x-2 mx-auto  max-w-[800px] grid grid-cols-3 md:grid-cols-4'   >
        {
          Array.from({length: 12}).map((_,index)=>(
            <li key={index} >
              <Skeleton className=' w-[90%] h-5' ></Skeleton>
            </li>
          ))
        }
      </ul>
    </section>
}