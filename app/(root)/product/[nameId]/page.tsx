import { FIVEMINUTES } from '@/app/common/constant';
import { fetcher, SearchParams } from '@/lib/utils';
import Advertisement from '../../components/Advertisement';
import Policy from '../../components/Policy';
import BannerSale from '../../components/BannerSale';
import Subscribe from '../../components/Subscribe';
import DealsOfMonth from '../../components/DealsOfMonth';
import ImageProduct from './components/ImageProduct';
import InfoProduct from './components/InfoProduct';
import { Suspense } from 'react';

export default function ProductDetail({
    params,
    searchParams,
}: {
    params: Promise<{ nameId: string }>;
    searchParams: Promise<SearchParams>;
}) {
    return (
        <>
            <section className="  grid grid-cols-1 md:grid-cols-2  gap-x-4 md:gap-[22px] lg:gap-[40px] xl:gap-[65px] section-page_home">
                <Suspense fallback={<div>loading ...</div>}>
                    <ImageProduct params={params} searchParams={searchParams} />
                    <InfoProduct params={params} searchParams={searchParams} />
                </Suspense>
            </section>
            <Advertisement />
            <Policy />
            <DealsOfMonth />
            <Subscribe />
        </>
    );
}
