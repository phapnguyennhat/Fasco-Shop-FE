'use client';
import { setExtraNav } from '@/lib/features/ExtraNav/extraNavSlice';
import { MoveUp } from 'lucide-react';
import { useDispatch } from 'react-redux';

export default function ButtonScrollUp() {
  const dispatch = useDispatch()
  const handleScrollUp = ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch(setExtraNav(false))
  }

    return (
        <button
            onClick={handleScrollUp}
            className="w-[40px] h-[40px] text-black hover:text-white transform transition-all duration-300 ease-in-out hover:bg-black  xl:h-[57px] xl:w-[57px] flex justify-center items-center rounded-full border-black border-2 border"
        >
            <MoveUp />
        </button>
    );
}
