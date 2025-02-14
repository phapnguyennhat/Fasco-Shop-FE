import { feeShip, feeWrap, minOrderFreeShip } from '@/app/common/constant';
import { SearchParams } from 'nuqs';
import React from 'react';

interface IProps {
    cartItems: ICartItem[];
    queryParams: SearchParams;
}
export default function TotalCheckout({ cartItems, queryParams }: IProps) {
    const subtotal = cartItems.reduce(
        (sum, cartItem) => sum + cartItem.quantity * cartItem.varient.price,
        0,
    );

    
    
    const isWrap = queryParams['wrap'] || 'false'
    
    let total = subtotal
    
    total+= subtotal<minOrderFreeShip ? feeShip : 0
    total+= isWrap==='true' ? feeWrap: 0
  
    return (
        <div className=" mb-[20px] ml-[18px] lg:ml-[40px] xl:ml-[82px] mr-3 max-w-[558px] space-y-[12px]">
            <div className=" w-full inline-flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>

            {isWrap === 'true' && (
                <div className=" w-full inline-flex justify-between">
                    <span>Wrap</span>
                    <span>${feeWrap}</span>
                </div>
            )}

            {subtotal < minOrderFreeShip && (
                <div className=" w-full inline-flex justify-between">
                    <span>Shipping</span>
                    <span>${feeShip}</span>
                </div>
            )}

            <div className=" w-full inline-flex justify-between">
                <span>Total</span>
                <span>${total}</span>
            </div>
        </div>
    );
}
