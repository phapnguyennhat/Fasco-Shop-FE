'use client'
import { setExtraNav } from "@/lib/features/ExtraNav/extraNavSlice";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";

export default function CloseExtraNav() {
  const { ref, inView } = useInView();

  useEffect(()=>{
    if(inView){
      dispatch(setExtraNav(false))
    }
  },[inView])

  const dispatch = useDispatch()
  return (
    <div ref={ref}  ></div>
  )
}
