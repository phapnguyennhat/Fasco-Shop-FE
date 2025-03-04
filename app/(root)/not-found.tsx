import Link from "next/link";
import Advertisement from "./components/Advertisement";
import Policy from "./components/Policy";
import FollowUs from "./components/FollowUs";
import Subscribe from "./components/Subscribe";

export default function NotFound() {
  return (
    <>
          <div className=' h-[300px] justify-center flex flex-col items-center' >
              <h2 className=' text-black text-2xl' >404 Error</h2>
              <p className=' text-lg text-center mb-2 ' >Sorry, We can't seem to find what you're looking for </p>
              <Link className=' button-black' href={'/'} >Go to Home</Link>
            
          </div>

          <Advertisement />
          <Policy />
          <FollowUs />
          <Subscribe />
      </>
  )
}