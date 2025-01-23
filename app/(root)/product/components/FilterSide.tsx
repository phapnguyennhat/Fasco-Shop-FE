'use client'
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { ListFilter } from 'lucide-react';



export default function FilterSide() {
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
         className={`fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
        >
            <h6 className=' font-volkhov lg:text-3xl text-[#000] md:text-2xl text-xl mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px] ' >Filters</h6>
            
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