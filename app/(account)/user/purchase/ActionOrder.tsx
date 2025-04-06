'use client'
import { EllipsisVertical } from "lucide-react";
import { getProfile } from "@/API/user/query";
import { EStatusOrder, ERole } from "@/app/common/enum";
import { updateStatusOrder } from "@/API/order/action";
import Link from "next/link";
import { useSocket } from "@/provider/SocketProvider";
import { useState } from "react";
import { isErrorResponse } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
interface IProps {
    order: IOrder
    user: User
}

export  function ActionOrder({ order, user }: IProps) {

    const socket = useSocket()
    const { toast } = useToast()

    const [isLoading, setIsLoading] = useState(false)

    const handleCancelOrder = async () => {
        setIsLoading(true)
        const response = await updateStatusOrder(order.id, EStatusOrder.CANCEL)
        if (isErrorResponse(response)) {
            toast({
                title: response.message,
                description: response.message,
                variant: "destructive"
            })
            setIsLoading(false)
            return
        }
        if (socket) {
            let href = `/user/purchase/${order.id}`
            let message = user?.role === ERole.ADMIN ? `Your order has been canceled by ${user?.name}` : `Order has been canceled by ${user?.name}`
            socket.emit('send_order_action', {
                message,
                href,
                receiverId: order.userId,
                orderId: order.id
            })
        }
        setIsLoading(false)
    }

    const handleShippingOrder = async () => {
        setIsLoading(true)
        const response = await updateStatusOrder(order.id, EStatusOrder.SHIPPING)
        if (isErrorResponse(response)) {
            toast({
                title: response.message,
                description: response.message,
                variant: "destructive"
            })
            setIsLoading(false)
            return
        }
        if (socket) {
            let href = `/user/purchase/${order.id}`
            let message = `Your order has been shipped  by ${user.name}`
            socket.emit('send_order_action', {
                message,
                href,
                receiverId: order.userId,
                orderId: order.id
            })
        }
        setIsLoading(false)
    }


    const handleCompleteOrder = async () => {
        setIsLoading(true)
        const response = await updateStatusOrder(order.id, EStatusOrder.COMPLETE)
        if (isErrorResponse(response)) {
            toast({
                title: response.message,
                description: response.message,
                variant: "destructive"
            })
            setIsLoading(false)
            return
        }
        if (socket) {
            let href = `/user/purchase/${order.id}`
            let message = `Your order has been completed by ${user.name}`
            socket.emit('send_order_action', {
                message,
                href,
                receiverId: order.userId,
                orderId: order.id
            })
        }
        setIsLoading(false)
    }


    return (
        <div className="flex justify-end  group cursor-pointer relative ">
            <EllipsisVertical />

            <ul className="z-10 bg-white  top-[110%]  right-0  shadow-md  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 absolute">
                <li className="p-4 py-2 hover:bg-gray-100">
                    <Link
                        href={`/user/purchase/${order.id}`}
                    >
                        Detail
                    </Link>
                </li>
                {order.status === EStatusOrder.PENDING && <li className="p-4 py-2 hover:bg-gray-100">

                    <button
                        onClick={handleCancelOrder}
                        disabled={isLoading}
                        type="submit"
                    >
                        Cancel
                    </button>

                </li>}

                {user?.role === ERole.ADMIN && order.status === EStatusOrder.PENDING && <li className="p-4 py-2 hover:bg-gray-100">

                    <button
                        onClick={handleShippingOrder}
                        disabled={isLoading}
                        type="submit"
                    >
                        Shipping
                    </button>

                </li>}

                {user?.role === ERole.ADMIN && order.status === EStatusOrder.SHIPPING && <li className="p-4 py-2 hover:bg-gray-100">

                    <button
                        onClick={handleCompleteOrder}
                        disabled={isLoading}
                        type="submit"
                    >
                        Complete
                    </button>

                </li>}
            </ul>
        </div>
    )
}