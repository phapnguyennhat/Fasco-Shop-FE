import {  Suspense } from 'react';
import BannerSale from './components/BannerSale';
import BrandHome from './components/BrandHome';
import DealsOfMonth from './components/DealsOfMonth';
import ExtraNav from './components/ExtraNav';
import NewArrival from './components/NewArrival';
import TriggerExtraNav from './components/TriggerExtraNav';
import ArrivalProducts, { SkeletonArrivalProducts } from './components/ArrivalProducts';
import Advertisement from './components/Advertisement';
import Policy from './components/Policy';
import FollowUs from './components/FollowUs';
import CustomerSay from './components/CustomerSay';
import Subscribe from './components/Subscribe';
import CloseExtraNav from './components/CloseExtraNav';
import { SkeletonCard } from './product/components/ProductCard';



export const experimental_ppr = true;

export default  function Home({
    searchParams
}: {
    searchParams: Promise<{ categoryName?: string }>,
    
}) {
    // const { categoryName } = await searchParams;

    return (
        <>
            <CloseExtraNav />
            <BannerSale />
            <BrandHome />
            <ExtraNav />
            <DealsOfMonth />
            <NewArrival searchParams={searchParams} />
            <Suspense fallback={<SkeletonArrivalProducts/>}>
                <ArrivalProducts searchParams={searchParams} />
            </Suspense>
            <TriggerExtraNav />
            <Advertisement />
            <Policy />
            <FollowUs />
            <CustomerSay />
            <Subscribe />
        </>
    );
}
