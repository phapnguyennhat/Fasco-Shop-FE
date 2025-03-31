import { feeWrap } from '@/app/common/constant';
import { createQueryString, getPriceVarient, SearchParams } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Check } from 'lucide-react';
import ButtonCheckout from './ButtonCheckout';
import { getCart } from '@/APIService/cart/query';

export default async function TotalCart({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const queryParams = await searchParams;
    const isWrap = queryParams['wrap'] || 'false';

    const cartItems: ICartItem[] = await getCart();
    const totalCart = cartItems.reduce(
        (sum, cartItem) => sum + cartItem.quantity * getPriceVarient(cartItem.varient),
        0,
    );

    const hasVariantSoldOut = cartItems.some(item => item.quantity > item.varient.pieceAvail)


    return (
        <section className=" mb-[22px]  md:mb-[40px] lg:mb-[70px]  section-page_home grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block " />
            <div>
                <Link
                    scroll={false}
                    replace={true}
                    href={`?${createQueryString('wrap', 'true', queryParams)}`}
                    className=" w-full px-3 mt-[12px] md:mt-[22px] lg:mt-[30px] mb-[16px] md:mb-[24px] lg:mb-[38px] inline-flex pb-[14px] lg:pb-[20px] gap-x-[12px] items-center  border-b-2"
                >
                    {isWrap === 'true' ? (
                        <div className=" size-[20px] md:size-[32px] bg-black">
                            <Check
                                className=" size-[20px] md:size-[32px]"
                                color="white"
                            />
                        </div>
                    ) : (
                        <div className=" size-[20px] md:size-[32px] border-[3px] border-black" />
                    )}
                    <p className=" font-poppins leading-[22px] md:text-[18px]  lg:text-[22px] text-[#8A8A8A]">
                        For <span className=" text-black">${feeWrap}</span>{' '}
                        Please Wrap The Product
                    </p>
                </Link>

                <div className=" mb-[16px] md:mb-[22px] lg:mb-[30px] px-3 flex justify-between font-volkhov md:text-[18px] lg:text-[22px] text-black">
                    <span>Subtotal</span>
                    <span>${totalCart.toFixed(2)}</span>
                </div>
                {/* <Link
                    className=" bg-black flex w-full mx-auto items-center button-black justify-center lg:h-[60px] "
                    href={`/checkout?${createQueryString(
                        undefined,
                        '',
                        queryParams,
                    )}`}
                >
                    Checkout
                </Link> */}
                <ButtonCheckout queryParams={queryParams} hasVariantSoldOut={hasVariantSoldOut} />
            </div>
        </section>
    );
}
