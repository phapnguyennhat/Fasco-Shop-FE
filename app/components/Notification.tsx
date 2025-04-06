'use client'

import { Bell } from "lucide-react";
import ListNotifycation from "./ListNotifycation";

import { useGetLog } from "@/hooks/log";
import { useEffect, useState } from "react";
import { useSocket } from "@/provider/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { revalidateOrderById, revalidateOrder } from "@/API/order/action";

export default function Notification() {
    const { data } = useGetLog({ collection: 'unRead', createAt: 'DESC' })

    const [showList, setShowList] = useState(false)


    const numItems = data?.pages[0].count || 0
    const socket = useSocket()
    const queryClient = useQueryClient()


    const handleReceiveLog = async (data: any) => {
        const orderId = data.orderId
        queryClient.invalidateQueries({ queryKey: ['log'] })
        revalidateOrderById(orderId)
        revalidateOrder()
    }

    useEffect(() => {
        if (!socket) return

        socket.on('receive_log', handleReceiveLog)
        return () => {
            socket.off('receive_log', handleReceiveLog)
        }
    }, [socket])



    return (
        <div onClick={() => setShowList(!showList)} className=" relative ">
           
                <Bell size={20} />
          
            {showList && <div className="  absolute top-[105%] left-[0.5px] w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200 " />}
            {<ListNotifycation showList={showList} />}
            <div
                className={`${numItems === 0 && 'hidden'
                    } font-volkhov  items-center text-white bg-red-500 w-[24px] h-[24px] flex justify-center  rounded-full absolute -right-[20px] -top-[10px] `}
            >
                {numItems > 9 ? '9+' : numItems}
            </div>
        </div>
    )
}
