import { ECollection } from '@/app/common/enum';
import Advertisement from '../components/Advertisement';
import CloseExtraNav from '../components/CloseExtraNav';
import FollowUs from '../components/FollowUs';
import Policy from '../components/Policy';
import Subscribe from '../components/Subscribe';
import Filter from './components/Filter';
import HeaderProduct from './components/HeaderProduct';
import ProductContent, { SkeletonProductContent } from './components/ProductContent';
import ExtraNav from '../components/ExtraNav';
import TriggerExtraNav from '../components/TriggerExtraNav';
import { Suspense } from 'react';
import { Metadata } from 'next';




export type QueryProduct = {
    page?: number ;
    limit?: number;
    keyword?:string;
    tag?: string;
    categoryName?: string;
    size?: string;
    brandName?: string;
    minPrice?: number;
    maxPrice?: number;
    collection?: ECollection;
};

export const metadata: Metadata = {
    title: 'Products',
    description: 'Best online shopping deals for everyone',
};

// export const experimental_ppr = true;

export default  function ProductPage({
    searchParams,
}: {
    searchParams: Promise<QueryProduct>;
}) {

    return (
        <>
            <HeaderProduct />
            <CloseExtraNav />
            <section className=" xl:max-w-[1280px] mx-3 md:mx-6 xl:mx-auto  flex  mb-[24px] md:mb-[30px] lg:mb-[18px] xl:mb-[33px] ">
                {/* <Suspense fallback={<div>loading ...</div>}> */}
                    <Filter searchParams={searchParams} />
                {/* </Suspense> */}
                <Suspense fallback={<SkeletonProductContent/>}>
                    <ProductContent searchParams={searchParams} />
                </Suspense>
                
            </section>  
            <ExtraNav />

            <Advertisement />
            <TriggerExtraNav />
            <Policy />
            <FollowUs />
            <Subscribe />
        </>
    );
}
