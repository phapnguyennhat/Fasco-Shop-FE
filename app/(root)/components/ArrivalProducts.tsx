import { createQueryString, delay, fetcher } from '@/lib/utils';
import ProductCard, { SkeletonProductCard } from './ProductCard';
import Link from 'next/link';
import { getProducts } from '@/APIService/product/query';

export default async function ArrivalProducts({
    searchParams,
}: {
    searchParams: Promise<{ categoryName?: string; collection?: string }>;
}) {
    const queryParams = await searchParams;

    const collection = queryParams.collection;
    const categoryName =
        queryParams.categoryName || (collection ? '' : "Men's Fashion");
    const query = collection
        ? `collection=${collection}&page=1&limit=6`
        : `categoryName=${categoryName}&page=1&limit=6`;
    const productData = await getProducts(query)
    const { products } = productData;
    return (
        <section className=" section-page_home mb-[60px] sm:mb-[80px] md:mb-[100px] lg:mb-[150px]   ">
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5   mb-[20px] md:mb-[36px] lg:mb-[50px]">
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>

            <Link
                href={`/product?${createQueryString(
                    undefined,
                    '',
                    queryParams,
                )}`}
                className=" mx-auto button-black  flex justify-center  items-center w-[140px] md:w-[180px] lg:w-[207px]  transition-all duration-300 lg:h-[56px] "
            >
                View More
            </Link>
        </section>
    );
}

export function SkeletonArrivalProducts() {
    return (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5   mb-[20px] md:mb-[36px] lg:mb-[50px]">
            {Array.from({ length: 6 }).map((_, index) => (
               <li key={index} className={`${index>3 && 'hidden md:block'}`} > <SkeletonProductCard  key={index} /></li>
            ))}
        </ul>
    );
}
