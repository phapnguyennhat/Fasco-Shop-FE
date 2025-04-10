    interface IProps{
    order: IOrder
}
export default function PaymentMethod({order}: IProps) {
    const {paymentMethod, paymentStatus} = order
    return (
        <div className=" mb-[30px] sm:pl-2 md:pl-0 lg:pl-4">
            <h6 className=" text-left sm:text-right md:text-left lg:text-right mb-[20px] font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                Payment Method
            </h6>

            <div className=" flex justify-between">
                <span>Payment Method</span>
                <span>{paymentMethod}</span>
            </div>
            <div className=" flex justify-between">
                <span>Payment Status</span>
               {paymentStatus === 'has_paid' ? <span className=" text-green-500 font-semibold" >Paid</span> : <span className=" text-red-500 font-medium" >Not Paid</span>}
            </div>
            <div>
                
            </div>
        </div>
    )
}