import { FIVEMINUTES } from '@/app/common/constant';
import { Skeleton } from '@/components/ui/skeleton';

import { createQueryString, fetcher, SearchParams } from '@/lib/utils';
import Image from 'next/image';
import SlideImage from './SlideImage';
import MainImage from './MainImage';

interface IProps {
    params: Promise<{ nameId: string }>
    searchParams: Promise<SearchParams>;
}

export default async function ImageProduct({ params , searchParams}: IProps) {
    const { nameId } = await params;
    const [_, id] = nameId.split('-i.');
    const product: Product = await fetcher<Product>(`product/${id}`, {
        method: 'GET',
        next: {
            revalidate: FIVEMINUTES,
        },
    });

    const queryParams = await searchParams
    const attrProduct = product.attrProducts[0] // attr has image
    const value = queryParams[attrProduct.name] || attrProduct.valueAttrs[0].value

    const valueAttr = attrProduct.valueAttrs.find(item => item.value===value)
   

    const images = product.images || [];
  
    return (
        <div className="   gap-x-[20px] flex gap-[12px]  flex-col    xl:flex-row">
            <SlideImage  images={ images} />
            <MainImage varientImage={valueAttr?.image} />
        </div>
    );
}
