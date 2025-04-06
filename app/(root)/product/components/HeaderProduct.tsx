import { ChevronRight } from "lucide-react";
import Link from "next/link";


export default function HeaderProduct() {
  return (
    <section className=" mb-[30px] md:mb-[40px] lg:mb-[60px] flex flex-col gap-y-[20px] items-center " >
      <h1 className=" text-black font-volkhov text-2xl md:text-[32px] md:leading-[32px] lg:text-[42px] lg:leading-[42px]"  >Product</h1>
      <h6 className="inline-flex text-gray-700 items-center gap-1  font-jost text-base">
        <Link className=" hover:text-black" href={'/'}>Home</Link>
        <ChevronRight size={20} />
        <Link className="hover:text-black" href={'/product'}>Product</Link>
      </h6>
    </section>
  )
}
