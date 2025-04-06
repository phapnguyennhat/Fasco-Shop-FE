'use client'
import { reloadProduct } from "@/API/product/action"
import { RotateCcw } from "lucide-react"
import { useState } from "react"
export default function ButtonReloadProduct() {
    const [isRotate, setIsRotate] = useState(false)
    const handleClick = () => {     
        setIsRotate(true)
        reloadProduct()
        setTimeout(() => setIsRotate(false), 1000)
    }
    return (
        // i want when click button reload product, the button will rotate 360 degree
        <button onClick={handleClick}>
            <RotateCcw  className={` size-[20px] md:size-[24px] lg:size-[28px] transition-all duration-1000 ${isRotate ? 'rotate-[360deg]' : ''}`} />
        </button>
    )
}
