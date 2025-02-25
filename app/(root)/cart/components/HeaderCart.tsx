import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HeaderCart() {
  return (
    <section className="  mb-[30px]  md:mb-[56px] lg:mb-[70px] flex flex-col gap-y-[8px] md:gap-y-[14px] lg:gap-y-[20px] items-center " >
      <h1 className=" text-black font-volkhov text-2xl md:text-[32px] md:leading-[32px] lg:text-[42px] lg:leading-[42px]"  >Shopping Cart</h1>
      <h6 className="inline-flex text-gray-700 items-center gap-1  font-jost text-base">
              <Link className=" hover:text-black" href={'/'}>Home</Link>
              <ChevronRight size={20} />
              <Link className="hover:text-black" href={'/cart'}>Cart</Link>
          </h6>
    </section>
  )
}
