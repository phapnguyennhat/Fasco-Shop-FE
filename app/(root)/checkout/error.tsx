'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import CloseExtraNav from '../components/CloseExtraNav'
import Advertisement from '../components/Advertisement'
import Policy from '../components/Policy'
import FollowUs from '../components/FollowUs'
import Subscribe from '../components/Subscribe'
import Link from 'next/link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
      <div>
          <div className=' h-[300px] justify-center flex flex-col items-center' >
              <h2 className=' text-black text-2xl' >404 Error</h2>
              <p className=' text-lg ' >Sorry, We can't seem to find what you're looking for </p>
              <Link className=' button-black' href={'/'} >Go to Home</Link>
            
          </div>

          <Advertisement />
          <Policy />
          <FollowUs />
          <Subscribe />
      </div>
  );
}