import { getCart } from "@/lib/api"
import CartItem from "./CartItem"
import TotalCheckout from "./TotalCheckout";
import { redirect } from "next/navigation";
import { SearchParams } from "@/lib/utils";

interface IProps{
    cartItems : ICartItem[]
    queryParams : SearchParams
}
export default async function ListProduct({cartItems, queryParams}: IProps) {
  
  return (
      <div className="bg-[#F5F5F5] pb-[30px]  md:min-h-[500px] pt-[32px] md:pt-[48px] lg:pt-[64px]">
          <ul className=" md:max-w-[558px] mb-[20px] ml-[18px] lg:ml-[40px] xl:ml-[82px] mr-3  space-y-[20px]" >
              {cartItems.map((cartItem, index) => (
                  <CartItem cartItem={cartItem} key={index} />
              ))}
          </ul>
          <TotalCheckout cartItems={cartItems} queryParams={queryParams}/>
      </div>
  );
}
