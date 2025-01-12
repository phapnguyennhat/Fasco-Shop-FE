'use client'

import { setExtraNav } from "@/lib/features/ExtraNav/extraNavSlice";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";

export default function TriggerExtraNav() {
  const { ref, inView } = useInView();

  const dispatch = useDispatch()

  

  useEffect(()=>{
    if(inView){
      dispatch(setExtraNav(true))
    }
  },[inView])
  
  return (
    <div ref={ref} ></div>
  )
}
