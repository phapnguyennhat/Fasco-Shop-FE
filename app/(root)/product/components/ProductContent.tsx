import { QueryProduct } from '../page';
import { createQueryString, fetcher, SearchParams } from '@/lib/utils';
import ProductCard from './ProductCard';
import FilterSide from './FilterSide';
import { FIVEMINUTES } from '@/app/common/constant';
import { getAllBrand, getBrands, getProducts, getTags } from '@/lib/api';
import SelectCollection from './SelectCollection';
import { PaginationLink } from '@/components/ui/pagination';
import PaginationList from '@/components/PaginationList';
import Image from 'next/image';

export default async function ProductContent({
    searchParams,
}: {
    searchParams: Promise<QueryProduct>;
}) {
    const queryParams = await searchParams;
    const query = createQueryString(undefined, '', queryParams as any);

    const [productdata, brands, tags] = await Promise.all([
        getProducts(query),
        getAllBrand(),
        getTags(),
    ]);

    const { products, count } = productdata;

    return (
        <div className=" mb-[30px]  flex-1  mr-3 ">
            <div className=" flex items-center gap-1 ">
                <FilterSide
                    queryParams={queryParams}
                    brands={brands}
                    tags={tags}
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
                            <ProductCard product={product} key={index} />
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
