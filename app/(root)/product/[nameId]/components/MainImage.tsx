'use client'
import { setShowImage } from "@/lib/features/ImageProduct/imageProductSlice"
import { RootState } from "@/lib/store"
import Image from "next/image"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

interface IProps {
  varientImage: ImageFile
}
export default function MainImage({varientImage}: IProps) {
  const showImage = useSelector((state: RootState)=>state.imageProduct.value)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(setShowImage(varientImage.url))
  },[])
   return (
       <Image
           src={showImage || varientImage.url}
           width={490}
           height={490}
           alt="Product Image"
           className=" size-auto xl:size-[490px] order-1 xl:order-2 border "
       />
   );
}
