import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import ActionProduct from './ActionProduct';
import { formatNumber } from '@/lib/utils';

interface IProps {
    product: Product;
}

export default function ProductCardAdmin({ product }: IProps) {
    return (
        <li className=" w-full  hover:scale-105 transition-all duration-300">
            <div className="group relative">
                <Image
                    width={302}
                    height={302}
                    src={product.images[0].url}
                    alt="product image"
                    className="  w-full h-auto   lg:mb-[19px]"
                />
                {product.pieceAvail === 0 && (
                    <p className=" absolute inset-0 flex items-center justify-center">
                        <span className=" text-white font-semibold uppercase text-sm p-3 md:p-4 lg:p-6 bg-[#B1B1B1] rounded-full">
                            Sold out
                        </span>
                    </p>
                )}
                <ActionProduct productId={product.id} />
            </div>
            <Link
                className=" "
                href={`/product/${encodeURIComponent(product.name)}-i.${
                    product.id
                }`}
            >
                <p className=" font-volkhov text-base text-black   line-clamp-1">
                    {product.name}
                </p>
                <p className=" space-x-1">
                    <span className=" font-jost text-sm: md:text-base  text-black">
                       
                        $
                        {product.discountPrice > 0
                            ? product.discountPrice
                            : product.price}
                    </span>
                    <span className=' text-sm md:text-base' >Sold: {formatNumber(product.sold)}</span>
                    <span className=' text-sm md:text-base' >Stock: {formatNumber(product.pieceAvail)}</span>
                </p>
            </Link>
        </li>
    );
}
