import {  Suspense } from 'react';
import BannerSale from './components/BannerSale';
import BrandHome from './components/BrandHome';
import DealsOfMonth from './components/DealsOfMonth';
import ExtraNav from './components/ExtraNav';
import NewArrival from './components/NewArrival';
import TriggerExtraNav from './components/TriggerExtraNav';
import ArrivalProducts from './components/ArrivalProducts';
import Advertisement from './components/Advertisement';
import Policy from './components/Policy';
import FollowUs from './components/FollowUs';
import CustomerSay from './components/CustomerSay';
import Subscribe from './components/Subscribe';

export const experimental_ppr = true;



export default async function Home({
    searchParams
}: {
    searchParams: Promise<{ categoryName?: string }>,
    
}) {
    const { categoryName } = await searchParams;

  
   
    return (
        <>
            <BannerSale />
            <BrandHome />
            <TriggerExtraNav />
            <ExtraNav />
            <DealsOfMonth />
            <NewArrival categoryName={categoryName || "Men's Fashion"} />
            <Suspense fallback={<div>Loading ...</div>}>
                {' '}
                <ArrivalProducts
                    categoryName={categoryName || "Men's Fashion"}
                />
            </Suspense>
            <Advertisement/>
            <Policy/>
            <FollowUs/>
            <CustomerSay/>
            <Subscribe/>
        </>
    );
}
