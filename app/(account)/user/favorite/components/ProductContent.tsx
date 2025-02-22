import ProductCard from '@/app/(root)/product/components/ProductCard';
import PaginationList from '@/components/PaginationList';
import { getFavoriteProducts } from '@/lib/api';
import { createQueryString, SearchParams } from '@/lib/utils';

interface IProps {
    searchParams: Promise<SearchParams>;
}
export default async function ProductContent({ searchParams }: IProps) {
    const queryParams = await searchParams;
    const query = createQueryString(undefined, '', queryParams);
    const { favoriteDetails, count } = await getFavoriteProducts(query);

    return (
        <div className=" mb-[30px] ">
                <ul className=" mb-[40px] px-2 md:px-4 w-full mt-[29px] gap-3 lg:gap-4 grid-cols-2  grid md:grid-cols-3   ">
                    {favoriteDetails.map((favoriteDetail, index) => (
                        <ProductCard
                            product={favoriteDetail.product}
                            key={index}
                        />
                    ))}
                </ul>
            <PaginationList
                queryParams={queryParams as SearchParams}
                count={count}
                limit={9}
            />
        </div>
    );
}
