import { FIVEMINUTES } from '@/app/common/constant';
import { delay, fetcher, SearchParams } from '@/lib/utils';
import Advertisement from '../../components/Advertisement';
import Policy from '../../components/Policy';
import BannerSale from '../../components/BannerSale';
import Subscribe from '../../components/Subscribe';
import DealsOfMonth from '../../components/DealsOfMonth';
import ImageProduct from './components/ImageProduct';
import InfoProduct from './components/InfoProduct';
import { getProductById, getProfile } from '@/lib/api';
import { Metadata } from 'next';


interface  IProps {
    params: Promise<{id: string}>
}
export async function generateMetadata(
   {params}: IProps
)
: Promise<Metadata>
{
    const { id } = await params;
    
    const product = await getProductById(id, undefined)
    return {
        title: product.name,
        description: `Order now only ${product.price}`
        
    }
}

export const experimental_ppr = true;

export default async function ProductDetail({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { id } = await params;
   
    const user: User |undefined = await getProfile()
    const product: Product = await getProductById(id, user?.id)
    return (
        <>
            <section className="  grid grid-cols-1 md:grid-cols-2  gap-x-4 md:gap-[22px] lg:gap-[40px] xl:gap-[65px] section-page_home">
                    <ImageProduct product={product} searchParams={searchParams} />
                    <InfoProduct product={product} searchParams={searchParams} />
            </section>
            <Advertisement />
            <Policy />
            <DealsOfMonth />
            <Subscribe />
        </>
    );
}
