import Image from 'next/image';

interface IProps {
    cartItem: ICartItem;
}
export default function CartItem({ cartItem }: IProps) {
    const valueAttr = cartItem.varient.valueAttrs[0];
    return (
        <li className=" inline-flex w-full   items-center">
            <div className=" relative inline-block mr-[20px]">
                <Image
                    src={valueAttr.image.url}
                    alt="Image product"
                    width={137}
                    height={137}
                    className="size-[80px] md:size-[100px] lg:size-[137px] border"
                />
                <p
                    className={` font-volkhov  items-center text-white bg-red-500 w-[24px] h-[24px] flex justify-center  rounded-full absolute -right-[10px] -top-[10px] `}
                >
                    {cartItem.quantity}
                </p>
            </div>
           <div className=' flex-1 items-center inline-flex justify-between'>
              <div className=" w-[80%] md:max-w-[274px]">
                  {' '}
                  <p className="line-clamp-2 text-black font-volkhov lg:text-[18px]">
                      {cartItem.varient.product.name}
                  </p>
                  <p>{valueAttr.value}</p>
              </div>
              <p>${(cartItem.varient.price * cartItem.quantity).toFixed(2)}</p>
           </div>
        </li>
    );
}
