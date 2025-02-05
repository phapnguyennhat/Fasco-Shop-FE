

import { QueryProduct } from "../page"
import { createQueryString, fetcher } from "@/lib/utils"
import ProductCard from "./ProductCard"
import FilterSide from "./FilterSide";
import { FIVEMINUTES } from "@/app/common/constant";

export default async function ProductContent({
  searchParams,
}: {
  searchParams: Promise<QueryProduct>;
})  {
  const queryParams = await searchParams
  const query = createQueryString(undefined, '', queryParams as any)
  // const products: Product[] = await fetcher<Product[]>(`product?${query}`, {
  //   method: 'GET',
  //   cache: 'no-cache'
  // })


  const getProducts = () =>{
    return  fetcher<{products: Product[], count: number}>(`product?${query}`, {
      method: 'GET',
      next: {
        revalidate: FIVEMINUTES
      }
    })
  }

  const getBrands = () => {
      return fetcher<{ name: string }[]>('brand?page=1&limit=6', {
          method: 'GET',
          next: {
              revalidate: FIVEMINUTES,
          },
      });
  };

  const getTags = () => {
      return fetcher<{ name: string }[]>('tag?page=1&limit=11', {
          method: 'GET',
          next: {
              revalidate: FIVEMINUTES,
          },
      });
  };

  const [productdata,brands, tags] = await Promise.all([getProducts(),getBrands(), getTags()]);

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
          <ul className="grid mt-[29px] md:grid-cols-3 grid-cols-2 gap-5" >
              {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
              ))}
          </ul>
      </div>
  );
}
