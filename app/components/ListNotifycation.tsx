'use client'

import { useGetLog } from "@/hooks/log";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { MdOutlineEventNote } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { updateLog } from "@/API/log/action";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface IProps {
    showList: boolean
}
export default function ListNotifycation({ showList }: IProps) {
    const { ref, inView } = useInView();

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useGetLog({ collection: 'all', createAt: 'DESC' })
    const count = data?.pages[0].count

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, hasNextPage]);
    const queryClient = useQueryClient()

    const handleUpdateLog = async (log: ILog) => {
        if (log.hasRead) return

        await updateLog(log.id, { hasRead: true })
        await queryClient.invalidateQueries({ queryKey: ['log'] })
    }

    if (count === 0) {
        return (
            <div className={`  ${showList ? 'block' : 'hidden'}  top-[140%] -right-[40px] absolute z-10  bg-white shadow-md rounded-md size-[300px] ${showList ? 'block' : 'hidden'}`} >
                <div className=" flex justify-center items-center h-full">
                    <p className=" text-gray-500 text-lg ">No notifications</p>
                </div>

            </div>
        )
    }

    return (
        <ul className={` h-[300px] overflow-y-auto scrollbar-hide  ${showList ? 'block' : 'hidden'}  z-10  absolute top-[140%] -right-[40px]  w-[300px] bg-white shadow-md rounded-md `}>
            {
                data?.pages.map((page) => (
                    page.data.map((item) => (
                        <li key={item.id} className=" hover:bg-gray-100 transition-all duration-300 px-4 py-2 ">

                            <Link onClick={() => handleUpdateLog(item)} className="  flex justify-between items-center" href={item.href}>
                                <div className=" flex items-center gap-2">
                                    <div>
                                        <MdOutlineEventNote size={30} />

                                    </div>

                                    <div>
                                        <p className=" ">{item.message}</p>
                                        <p className=" text-gray-500 font-light" >{item.createAt}</p>
                                    </div>

                                </div>

                                {!item.hasRead && <div className=" bg-red-500 p-1 rounded-full animate-pulse  " />}

                            </Link>

                        </li>
                    ))
                ))
            }
            <li>
                <div ref={ref} className=" flex justify-center mt-3">
                    {status === 'pending' || isFetchingNextPage ? (
                        <Loader2 className=" size-[40px] animate-spin " />
                    ) : (
                        <p className=" mt-3 text-gray-500 text-lg ">End of list</p>
                    )}
                </div>
            </li>


        </ul>
    )
}
