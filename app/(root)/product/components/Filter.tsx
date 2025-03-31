import { QueryProduct } from '../page';
import SizeFilter from './SizeFilter';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import CollectionFilter from './CollectionFilter';
import TagFilter from './TagFilter';
import CategoryFilter from './CategoryFilter';
import { getCategory } from '@/APIService/category/query';
import { getTags } from '@/APIService/tag/query';
import { getAllBrand } from '@/APIService/shop/query';

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
