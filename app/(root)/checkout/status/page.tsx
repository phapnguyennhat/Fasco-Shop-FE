'use client'
import { notFound, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { revalidateCart } from "@/API/cart/action";



// interface IProps {
//     searchParams: Promise<{
//         resultCode: string
//         orderId: string
        
//     }>
// }
export default  function MomoPage() {
    const searchParams = useSearchParams()
    const resultCode = searchParams.get('resultCode')
   

    useEffect(() => {
        if (resultCode !== '0') {
            revalidateCart()
        }
    }, [resultCode])    
    if (!resultCode) {
        notFound()
    }

    if (resultCode === '0') {
        return (
            <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
                <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full'>
                    <div className='mb-6'>
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-800 mb-4'>Order Successful</h1>
                    <p className='text-gray-600 mb-6'>Thank you for your purchase! Your order has been processed successfully.</p>
                    <Link href="/" className='inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors'>
                        Return to Home
                    </Link>
                </div>
            </main>
        )
    }
    return (
        <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full'>
                <div className='mb-6'>
                    <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <h1 className='text-2xl font-bold text-gray-800 mb-4'>Payment Failed</h1>
                <p className='text-gray-600 mb-6'>We're sorry, but your payment could not be processed. Please try again.</p>
                <Link href="/cart" className='inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors'>
                    Try Again
                </Link>
            </div>
        </main>
    )
}
