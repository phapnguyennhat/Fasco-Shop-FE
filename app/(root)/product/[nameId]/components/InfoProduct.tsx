import StarRating from '@/app/(root)/components/StarRating';
import Image from 'next/image';
import CountDownMonth from './CountDownMonth';
import AttrProduct from './AttrProduct';
import {
    createQueryString,
    fetcher,
    formatEstimatedDelivery,
    SearchParams,
} from '@/lib/utils';
import { Suspense } from 'react';
import Form from 'next/form';
import FormAddCart from './FormAddCart';
import {
    FIVEMINUTES,
    maxDelivery,
    minDelivery,
    minOrderFreeShip,
} from '@/app/common/constant';
import { CircleHelp, Share2 } from 'lucide-react';

export default async function InfoProduct({
    searchParams,
    params,
}: {
    params: Promise<{ nameId: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { nameId } = await params;
    const [_, id] = nameId.split('-i.');
    const product: Product = await fetcher<Product>(`product/${id}`, {
        method: 'GET',
        next: {
            revalidate: FIVEMINUTES,
        },
    });
    const queryParams = await searchParams;

    product.attrProducts.forEach((attrProduct) => {
        queryParams[attrProduct.name] =
            queryParams[attrProduct.name] || attrProduct.valueAttrs[0].value;
    });

    const query = createQueryString(undefined, '', queryParams);
    console.log(`product/${id}/varient?${query}`)
    const varient: Varient = await fetcher<Varient>(
        `product/${id}/varient?${query}`,
        {
            method: 'GET',
            next: {
                revalidate: FIVEMINUTES,
            },
        },
    );
    return (
        <>
            <div>
                <h3 className=" font-volkhov text-sm text-[#666666] mb-[5px] ">
                    Fasco
                </h3>
                <h6 className=" flex justify-between mb-2">
                    <span className=" font-volkhov text-[#000] text-lg md:text-[20px] lg:text-[30px] leading-[30px]">
                        {product.name}
                    </span>
                    <Image
                        src={'/icons/favorite.png'}
                        alt="icon star"
                        width={20}
                        height={20}
                        className="size-[20px] "
                    />
                </h6>
                <StarRating starRating={product.starRating}>
                    <Image
                        alt="black star icon"
                        src={'/icons/black-star.png'}
                        width={15}
                        height={15}
                        className=" size-[15px]"
                    />
                </StarRating>
                <p className=" mt-[8px] md:mt-[16px] lg:mt-[20px] mb-[8px] md:mb-[16px] lg:mb-[30px] font-volkhov md:text-[18px] lg:text-[24px] text-[#000]">
                    ${varient.price}
                </p>
                <p className=" flex items-center mb-[8px] md:mb-[16px] lg:mb-[30px] ">
                    <Image
                        alt=" eye icon "
                        src={'/icons/eye.png'}
                        width={20}
                        height={20}
                        className=" size-[20px]"
                    />
                    <span className="text-[#8A8A8A] ">
                        24 people are viewing this right now
                    </span>
                </p>
                <div className="flex  p-[10px] lg:p-[14px] mb-[16px] lg:mb-[30px] bg-[#FDEFEE] border border-[#F8CCCC]  justify-between items-center text-[#FF706B]">
                    <p className=" font-volkhov  lg:text-lg">
                        Hurry up! Sale ends in:
                    </p>
                    <CountDownMonth />
                </div>

                {varient.pieceAvail <= 10 ? (
                    <p className=" mb-[16px] lg:mb-[30px] font-jost text-[#666666]">
                        Only{' '}
                        <span className=" font-bold">
                            {' '}
                            {varient.pieceAvail}
                        </span>
                        item(s) left in stock
                    </p>
                ) : (
                    <p className=" mb-[16px] lg:mb-[30px] font-jost text-[#666666]">
                        <span className="  font-bold">
                            {' '}
                            {varient.pieceAvail}
                        </span>{' '}
                        item(s) left in stock
                    </p>
                )}

                <Suspense fallback={'Loading ...'}>
                    {' '}
                    <AttrProduct
                        attrProducts={product.attrProducts}
                        searchParams={searchParams}
                    />
                </Suspense>
            </div>

            <div className='md:hidden lg:block' ></div>
            <div className=' flex flex-col gap-3 md:col-span-2 lg:col-span-1' >
                <FormAddCart varient={varient} />

                <div className=" border-b pb-[12px]  ">
                    <div className=" mr-[30px] gap-2 inline-flex items-center">
                        {' '}
                        <CircleHelp />
                        Ask a question
                    </div>
                    <div className=" gap-2 inline-flex items-center">
                        <Share2 /> Share
                    </div>
                </div>

                <div className=" gap-2 inline-flex items-center">
                    <Image
                        src={'/icons/truckShip.svg'}
                        alt="truck ship"
                        width={20}
                        height={20}
                        className=" size-[20px]"
                    />
                    <p>
                        <span className=" text-black font-volkhov font-bold">
                            Estimated Delivery:{' '}
                        </span>
                        <span className="font-jost text-black">
                            {formatEstimatedDelivery(minDelivery, maxDelivery)}
                        </span>
                    </p>
                </div>

                <div className=" mb-[30px] gap-2 inline-flex items-center">
                    <Image
                        src={'/icons/box.svg'}
                        alt="box icon"
                        width={20}
                        height={20}
                        className=" size-[20px]"
                    />
                    <p>
                        <span className=" text-black font-volkhov font-bold">
                            Free Shipping & Returns:{' '}
                        </span>
                        <span className="font-jost text-black">
                            On all orders over ${minOrderFreeShip}
                        </span>
                    </p>
                </div>

                <div className=" mb-[30px] flex flex-col items-center gap-y-[20px]">
                    <Image
                        src={'/icons/methodpayment.png'}
                        width={320}
                        height={26}
                        className=" h-auto w-auto"
                        alt="method payment"
                    />
                    <p className="font-volkhov text-black">
                        Guarantee safe & secure checkout
                    </p>
                </div>
            </div>
        </>
    );
}
