'use client'
import { useState } from 'react';
import { ListFilter } from 'lucide-react';
import { QueryProduct } from '../page';
import SizeFilter from './SizeFilter';
import PriceFilter from './PriceFilter';
import BrandFilter from './BrandFilter';
import CollectionFilter from './CollectionFilter';
import TagFilter from './TagFilter';



export default function FilterSide({ queryParams, brands, tags}: {queryParams: QueryProduct, brands: {name: string}[], tags: {name: string}[]}) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleFilter = ()=>{
    setIsOpen(!isOpen)
  }
  return (
    <div className=' pt-1 lg:hidden' >
        <button onClick={toggleFilter} >
        <ListFilter className=' size-[22px] sm:size-[30px]' />
        </button>

        <aside
         className={` p-4  fixed z-20 top-0 left-0 h-full w-[230px] md:w-[322px] bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
        >
            <h6 className=' font-volkhov lg:text-3xl text-[#000] md:text-2xl text-xl mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px] ' >Filters</h6>
            <SizeFilter queryParams={queryParams} />
            <PriceFilter queryParams={ queryParams} />
            <BrandFilter queryParams={queryParams} brands={brands} />
            <CollectionFilter queryParams={ queryParams} />
            <TagFilter queryParams={ queryParams} tags={tags} />
            
        </aside>

        {isOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black bg-opacity-50"
                    onClick={toggleFilter}
                ></div>
            )}
    </div>
  )
}