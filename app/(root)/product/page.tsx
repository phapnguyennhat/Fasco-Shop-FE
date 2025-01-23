import { ECollection } from '@/app/common/enum';
import Advertisement from '../components/Advertisement';
import CloseExtraNav from '../components/CloseExtraNav';
import FollowUs from '../components/FollowUs';
import Policy from '../components/Policy';
import Subscribe from '../components/Subscribe';
import Filter from './components/Filter';
import HeaderProduct from './components/HeaderProduct';
import ProductContent from './components/ProductContent';
import ExtraNav from '../components/ExtraNav';
import TriggerExtraNav from '../components/TriggerExtraNav';
import { Suspense } from 'react';
import { SkeletonCard } from './components/ProductCard';

export type QueryProduct = {
    page?: number;
    limit?: number;
    tag?: string;
    categoryName?: string;
    size?: string;
    brandName?: string;
    minPrice?: number;
    maxPrice?: number;
    collection?: ECollection;
};
export const experimental_ppr = true;

export default async function ProductPage({
    searchParams,
}: {
    searchParams: Promise<QueryProduct>;
}) {

    return (
        <>
            <HeaderProduct />
            <CloseExtraNav />
            <Suspense fallback={<div>loading ...</div>}>
                <section className=" section-page_home flex ">
                    <Filter searchParams={searchParams} />
                    <ProductContent searchParams={searchParams} />
                </section>
            </Suspense>
            <ExtraNav />
            <TriggerExtraNav />

            <Advertisement />
            <Policy />
            <FollowUs />
            <Subscribe />
        </>
    );
}
