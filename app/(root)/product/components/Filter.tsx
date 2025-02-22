import { FIVEMINUTES, prices, sizes } from '@/app/common/constant';
import { fetcher } from '@/lib/utils';
import Link from 'next/link';
import { string } from 'zod';
import { QueryProduct } from '../page';
import SizeFilter from './SizeFilter';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import CollectionFilter from './CollectionFilter';
import TagFilter from './TagFilter';
import { getAllBrand, getCategory, getTags } from '@/lib/api';
import CategoryFilter from './CategoryFilter';

export default async function Filter({
    searchParams,
}: {
    searchParams: Promise<QueryProduct>;
}) {
 
    const queryParams = await searchParams

 
    const [brands, tags, categories] = await Promise.all([getAllBrand(), getTags(), getCategory()])


    return (
        <aside className=' ml-3 lg:w-[280px] xl:w-[322px] hidden lg:block  ' >
            <h6 className=' font-volkhov xl:text-3xl text-[#000] lg:text-2xl text-xl mb-[8px] md:mb-[16px] lg:mb-[18px] xl:mb-[33px] ' >Filters</h6>
            <SizeFilter queryParams={queryParams} />
            <PriceFilter queryParams={queryParams} />
            <BrandFilter queryParams={queryParams} brands={brands}  />
            <CategoryFilter categories={categories} queryParams={queryParams} />
            <CollectionFilter queryParams={queryParams} />
            <TagFilter queryParams={queryParams} tags={tags} />
 
        </aside>
    );
}
