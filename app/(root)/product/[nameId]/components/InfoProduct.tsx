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
    maxDelivery,
    minDelivery,
    minOrderFreeShip,
} from '@/app/common/constant';
import { CircleHelp, Share2 } from 'lucide-react';
import { FaStar } from 'react-icons/fa6';
import FavoriteProduct from './FavoriteProduct';
import { getVariant } from '@/APIService/product/query';

export default async function InfoProduct({
    searchParams,
    product
}: {
    product: Product
    searchParams: Promise<SearchParams>;
}) {
   
    const queryParams = await searchParams;

    const {id,attrProducts, favoriteDetails} = product


    attrProducts.forEach((attrProduct) => {
        queryParams[attrProduct.name] =
            queryParams[attrProduct.name] || attrProduct.valueAttrs[0].value;
    });


    const query = createQueryString(undefined, '', queryParams);
    const varient: Varient = await getVariant(id, query)
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
                   <FavoriteProduct productId={product.id} isFavorite={favoriteDetails.length!==0} />
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

                <VarientPrice price={varient.price} discountPrice={varient.discountPrice} />

                {/* <p className=" flex items-center mb-[8px] md:mb-[16px] lg:mb-[30px] ">
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
                </p> */}
         {   varient.discountPrice>0 &&    <div className="flex  p-[10px] lg:p-[14px] mb-[16px] lg:mb-[30px] bg-[#FDEFEE] border border-[#F8CCCC]  justify-between items-center text-[#FF706B]">
                    <p className=" font-volkhov  lg:text-lg">
                        Hurry up! Sale ends in:
                    </p>
                    <CountDownMonth />
                </div>}

                <PieceAvail pieceAvail={varient.pieceAvail} />
               

                <Suspense >
                    {' '}
                    <AttrProduct
                        attrProducts={product.attrProducts}
                        searchParams={searchParams}
                    />
                </Suspense>
            </div>

            <div className="md:hidden lg:block"></div>
            <div className=" flex flex-col gap-3 md:col-span-2 lg:col-span-1">
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


function PieceAvail({pieceAvail}: {pieceAvail: number}){

    if(pieceAvail===0){
        return (
            <p className=" font-semibold text-lg uppercase mb-[16px] lg:mb-[30px] font-jost text-[#666666]">
                Sold out
        </p>
        )
    }

    else if(pieceAvail <= 10 )
    {
        return (
        <p className=" mb-[16px] lg:mb-[30px] font-jost text-[#666666]">
            Only{' '}
            <span className=" font-bold">
                {' '}
                {pieceAvail}
            </span>
            item(s) left in stock
        </p>

        )
    }

       return  (
           <p className=" mb-[16px] lg:mb-[30px] font-jost text-[#666666]">
               <span className="  font-bold">
                   {' '}
                   {pieceAvail}
               </span>{' '}
               item(s) left in stock
           </p>
       )
         
}

function VarientPrice ({ price, discountPrice}: {price:number, discountPrice :number}){
    const isDiscount = discountPrice>0 

    if(isDiscount){
        return (
            <p className="inline-flex gap-x-[7px] items-center mt-[8px] md:mt-[16px] lg:mt-[20px] mb-[8px] md:mb-[16px] lg:mb-[30px] ">
                <span className="  font-volkhov md:text-[18px] lg:text-[24px] text-[#000]">
                    {' '}
                    ${discountPrice}
                </span>
                <span className=' font-jost text-base line-through text-[#666] px-[5px]' >${price}</span>
                <span className=' font-jost text-[11px] font-medium uppercase text-white bg-[#DA3F3F] px-[10px] py-[2px] rounded-[11px] ' > Save {((1-discountPrice/price)*100).toFixed(0)}%</span>
            </p>
        );
    }

    return  (
        <p className=" mt-[8px] md:mt-[16px] lg:mt-[20px] mb-[8px] md:mb-[16px] lg:mb-[30px] ">
        <span className=' font-volkhov md:text-[18px] lg:text-[24px] text-[#000]'>  ${  price}</span>
      </p>
    )

}