import { delay, fetcher, SearchParams } from '@/lib/utils';
import Advertisement from '../../components/Advertisement';
import Policy from '../../components/Policy';
import BannerSale from '../../components/BannerSale';
import Subscribe from '../../components/Subscribe';
import DealsOfMonth from '../../components/DealsOfMonth';
import ImageProduct from './components/ImageProduct';
import InfoProduct from './components/InfoProduct';
import { Metadata } from 'next';
import { getProfile } from '@/API/user/query';
import { getProductById } from '@/API/product/query';


interface  IProps {
    params: Promise<{nameId: string}>
}
export async function generateMetadata(
   {params}: IProps
)
: Promise<Metadata>
{
    const { nameId } = await params;
    const [_, id] = nameId.split('-i.');
    const product = await getProductById(id, undefined)
    return {
        title: product.name,
        description: `Order now only ${product.price}`
        
    }
}

// export const experimental_ppr = true;

export default async function ProductDetail({
    params,
    searchParams,
}: {
    params: Promise<{ nameId: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { nameId } = await params;
    const [_, id] = nameId.split('-i.');
   
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
