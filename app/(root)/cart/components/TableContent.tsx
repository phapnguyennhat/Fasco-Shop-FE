import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import InputQuantity from './InputQuantity';
import { getPriceVarient } from '@/lib/utils';
import Link from 'next/link';
import { deleteCartItem } from '@/APIService/cart/action';


interface IProps {
    cartItems : ICartItem[]
}
export default  function TableContent({cartItems}: IProps) {

    const handleDeleteCartItem = async (formData: FormData) =>{
        'use server'
        const id = formData.get('id')
        try {
            await deleteCartItem(id as string)
        } catch (error) {
            
        }
    }

    return (
        <TableBody>
            {cartItems.map((cartItem, index) => (
                <TableRow className="  cartItem " key={index}>
                    <TableCell className=" gap-4 md:pt-[26px] md:pb-[28px] lg:pt-[35px] lg:pb-[44px] grid grid-cols-2">
                        <Link
                       href={`/product/${encodeURIComponent(cartItem.varient.product.name)}-i.${
                        cartItem.varient.product.id
                    }`}
                         className=" relative size-auto md:size-[168px] ">
                            <Image
                                alt="image varient"
                                width={168}
                                height={168}
                                className=" border size-auto md:size-[168px]"
                                src={cartItem.varient.valueAttrs[0].image.url}
                            />
                          { cartItem.varient.pieceAvail <=0 && <p className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold">
                                Sold out
                            </p>}
                        </Link>
                        <div className=" flex flex-col md:gap-y-[10px] lg:gap-y-[14px]">
                            <p className=" line-clamp-3 font-volkhov leading-[22px] md:text-[18px]   lg:text-[22px] text-black">
                                {cartItem.varient.product.name}
                            </p>
                            <p className=" font-poppins text-[#8A8A8A] leading-[22px] md:text-[18px]  lg:text-[22px]">
                                {
                                    cartItem.varient.valueAttrs[0].attrProduct
                                        .name
                                }
                                : {cartItem.varient.valueAttrs[0].value}
                            </p>
                            <form action={handleDeleteCartItem}>
                                <input
                                    name="id"
                                    type="text"
                                    hidden
                                    readOnly
                                    value={cartItem.id}
                                />
                                <button className=" underline font-poppins leading-[22px] md:text-[18px] lg:text-[22px] text-[#8A8A8A]">
                                    Remove
                                </button>
                            </form>
                        </div>
                    </TableCell>

                    <TableCell className=" pt-[35px] align-top text-black font-volkhov md:text-[18px]  lg:text-[22px] leading-[22px]">
                        ${ getPriceVarient(cartItem.varient)}
                    </TableCell>

                    <TableCell className=" pt-[30px] align-top">
                        <InputQuantity cartItem={cartItem} />
                    </TableCell>

                    <TableCell className=" font-volkhov md:text-[18px] lg:text-[22px]  text-black pt-[35px] align-top text-right">
                        $
                        {(cartItem.quantity * getPriceVarient(cartItem.varient)).toFixed(
                            2,
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}
