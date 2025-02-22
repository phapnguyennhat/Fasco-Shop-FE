import { fetcher } from "@/lib/utils"
import ProductCard from "./ProductCard"
import Link from "next/link"
import { FIVEMINUTES } from "@/app/common/constant"

export default  async function ArrivalProducts({searchParams}: {searchParams: Promise<{ categoryName?: string }>}) {
  const categoryName = (await searchParams).categoryName || "Men's Fashion"
  const productData  = await fetcher<{products: Product[], count: number}>(`product?categoryName=${categoryName}&page=1&limit=6`, {
    method: 'GET',
    next: {
      revalidate: FIVEMINUTES,
      tags: ['products']
    }

  })
  const {products} =productData
  return (
    <section className=" section-page_home mb-[60px] sm:mb-[80px] md:mb-[100px] lg:mb-[150px]   ">
       <div className=" flex flex-wrap mb-[20px] md:mb-[36px] lg:mb-[50px]">
          {products.map((product, index)=>(
            <ProductCard product={product} key={ index} />
          ))}
       </div>

        <Link href={'/product'} className=" mx-auto button-black  flex justify-center  items-center w-[140px] md:w-[180px] lg:w-[207px]  transition-all duration-300 lg:h-[56px] " >View More</Link>
    </section>
  )
}
