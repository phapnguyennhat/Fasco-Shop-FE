import { FIVEMINUTES } from '@/app/common/constant';
import { Skeleton } from '@/components/ui/skeleton';

import { createQueryString, fetcher, SearchParams } from '@/lib/utils';
import Image from 'next/image';
import SlideImage from './SlideImage';
import MainImage from './MainImage';

interface IProps {
   product: Product
    searchParams: Promise<SearchParams>;
}

export default async function ImageProduct({ product , searchParams}: IProps) {
   
    const queryParams = await searchParams
    const attrProduct = product.attrProducts[0] // attr has image
    const value = queryParams[attrProduct.name] || attrProduct.valueAttrs[0].value

    const valueAttr = attrProduct.valueAttrs.find(item => item.value===value)
   

    const images = product.images || [];
  
    return (
        <div className="   gap-x-[20px] flex gap-[12px]  flex-col    xl:flex-row">
            <SlideImage  images={ images} />
            <MainImage varientImage={valueAttr?.image as ImageFile} />
        </div>
    );
}
