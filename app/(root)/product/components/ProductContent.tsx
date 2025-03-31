import { QueryProduct } from '../page';
import { createQueryString, delay, fetcher, SearchParams } from '@/lib/utils';
import ProductCard, { SkeletonCard } from './ProductCard';
import FilterSide from './FilterSide';
import SelectCollection from './SelectCollection';
import { PaginationLink } from '@/components/ui/pagination';
import PaginationList from '@/components/PaginationList';
import Image from 'next/image';
import { ERole } from '@/app/common/enum';
import ProductCardAdmin from './ProductCardAdmin';
import { getProfile } from '@/API/user/query';
import { getCategory } from '@/API/category/query';
import { getProducts } from '@/API/product/query';
import { getTags } from '@/API/tag/query';
import { getAllBrand } from '@/API/shop/query';

export default async function ProductContent({
    searchParams,
}: {
    searchParams: Promise<QueryProduct>;
}) {
    const queryParams = await searchParams;
    const query = createQueryString(undefined, '', queryParams as any);


    const [productdata, brands, tags, categories, user] = await Promise.all([
        getProducts(query),
        getAllBrand(),
        getTags(),
        getCategory(),
        getProfile()
    ]);

    const { products, count } = productdata;

    return (
        <div className=" mb-[30px]  flex-1  mr-3 ">
            <div className=" flex items-center gap-1 ">
                <FilterSide
                    queryParams={queryParams}
                    brands={brands}
                    tags={tags}
                    categories = {categories}
                />
                <SelectCollection queryParams={queryParams} />
            </div>

            {products.length === 0 ? (
                <Image
                    src={'/images/no_product.png'}
                    width={500}
                    height={500}
                    className=' mx-auto'
                    alt="not found product"
                />
            ) : (
                <>
                    {' '}
                    <ul className="mb-[40px]  w-full mt-[29px] gap-3 lg:gap-4 grid-cols-2  grid md:grid-cols-3  ">
                        {products.map((product, index) => (
                          user?.role === ERole.ADMIN? <ProductCardAdmin key={index} product={product} />:  <ProductCard product={product} key={index} />
                        ))}
                    </ul>
                    <PaginationList
                        queryParams={queryParams as SearchParams}
                        count={count}
                        limit={9}
                    />
                </>
            )}
        </div>
    );
}


export function SkeletonProductContent () {
    return (
        <ul className='mb-[40px]  w-full mt-[29px] gap-3 lg:gap-4 grid-cols-2  grid md:grid-cols-3 ' >
            {Array.from({length: 12}).map((_,index)=>(
                <SkeletonCard key={index}/>
            ))}
        </ul>
    )
}