

import { QueryProduct } from "../page"
import { createQueryString, fetcher } from "@/lib/utils"
import ProductCard from "./ProductCard"
import FilterSide from "./FilterSide";

export default async function ProductContent({
  searchParams,
}: {
  searchParams: Promise<QueryProduct>;
})  {
  const queryParams = await searchParams
  const query = createQueryString(undefined, '', queryParams as any)
  const products: Product[] = await fetcher<Product[]>(`product?${query}`, {
    method: 'GET',
    cache: 'no-cache'
  })

  return (
      <div className=" lg:max-w-[730px] xl:max-w-[978px]  " >
         <div className=" flex items-center gap-1 ">
            <FilterSide/>
            <select className="" name="collection" id="collection">
                <option value="best selling">Best Selling</option>
                <option value="new arrival">New Arrival</option>
            </select>
         </div>
          <ul className="grid mt-[29px] md:grid-cols-3 grid-cols-2 gap-5" >
              {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
              ))}
          </ul>
      </div>
  );
}
