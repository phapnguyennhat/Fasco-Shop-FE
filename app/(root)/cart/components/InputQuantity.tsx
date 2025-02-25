'use client'

import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useInputQuantity from "../hook/useInputQuantity";
import { Input } from "@/components/ui/input";
import { updateCartItem } from "@/app/action";
import debounce from "lodash.debounce";

interface IProps{
  cartItem: ICartItem
}

export default function InputQuantity({ cartItem}: IProps) {
  const maxQuantity =cartItem.varient.pieceAvail
      const [quantity, setQuantity] = useState(cartItem.quantity.toString());
      const disable = maxQuantity <= 0;

      useEffect(()=>{
        setQuantity(cartItem.quantity.toString())
      },[cartItem])

      useEffect(() => {
        if (quantity !== cartItem.quantity.toString()) {
          debouncedUpdate(cartItem.id, parseInt(quantity));
        }
        // Cleanup: Hủy debounce khi unmount để tránh memory leak
        return () => debouncedUpdate.cancel();
      }, [quantity, cartItem.id]);
  

      const debouncedUpdate = useCallback(
        debounce((id: string, newQuantity: number) => {
          try {
            updateCartItem(id, newQuantity);
          } catch (error) {
            console.error('Update failed', error);
          }
        }, 1500),
        [] // Để trống dependencies để giữ nguyên hàm debounce
      );

      const { handleMinus, handlePlus, handleChange, handleOnBlur } =
      useInputQuantity({ setQuantity, maxQuantity });
  return (
      <div className="w-[120px] rounded-[4px] bg-white md:h-[42px] flex items-center border ">
          <button
              onClick={handleMinus}
              className="pl-[12px]"
              type="button"
              disabled={disable}
          >
              <Minus />
          </button>
          <Input
              value={ disable? '0' : quantity}
              type="text"
              name="quantity"
              disabled={disable}
              onBlur={handleOnBlur}
              onChange={handleChange}
              className={`  focus-visible:ring-0  text-black border-none rounded-none h-full  text-center ${
                  disable && 'text-gray-500'
              } `}
          />
          <button
              onClick={handlePlus}
              className="pr-[12px]"
              type="button"
              disabled={disable}
          >
              <Plus />
          </button>
      </div>
  );
}
