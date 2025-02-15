

import { QueryProduct } from "../page"
import { createQueryString, fetcher } from "@/lib/utils"
import ProductCard from "./ProductCard"
import FilterSide from "./FilterSide";
import { FIVEMINUTES } from "@/app/common/constant";
import { getBrands, getProducts, getTags } from "@/lib/api";

export default async function ProductContent({
  searchParams,
}: {
  searchParams: Promise<QueryProduct>;
})  {
  const queryParams = await searchParams
  const query = createQueryString(undefined, '', queryParams as any)
 
  const [productdata,brands, tags] = await Promise.all([getProducts(query),getBrands(), getTags()]);

  const {products,count} = productdata
  

  return (
      <div className=" flex-1  mr-3 " >
         <div className=" flex items-center gap-1 ">
            <FilterSide queryParams={ queryParams} brands={brands} tags={tags} />
            <select className="" name="collection" id="collection">
                <option value="best selling">Best Selling</option>
                <option value="new arrival">New Arrival</option>
            </select>
         </div>
          <ul className="mb-[40px] w-full mt-[29px] gap-3 lg:gap-4 grid-cols-2  grid md:grid-cols-3  " >
              {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
              ))}
          </ul>
      </div>
  );
}
