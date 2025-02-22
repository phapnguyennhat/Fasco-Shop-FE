interface IProps {
    totalOrder: ITotalOrder;
}
export default function TotalOrder({ totalOrder }: IProps) {
    return (
        <div className=" mb-[30px] sm:pl-2 md:pl-0 lg:pl-4" >
            <h6 className=" text-left sm:text-right md:text-left lg:text-right mb-[20px] font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                Total
            </h6>

            <div className=" flex justify-between">
                <span>Subtotal</span>
                <span>${totalOrder.subTotal}</span>
            </div>

            {totalOrder.wrap && (
                <div className=" flex justify-between">
                    <span>Wrap</span>
                    <span>${totalOrder.wrap}</span>
                </div>
            )}

            {totalOrder.shipping && (
                <div className=" flex justify-between">
                    <span>Shipping</span>
                    <span>${totalOrder.shipping}</span>
                </div>
            )}
        </div>
    );
}
