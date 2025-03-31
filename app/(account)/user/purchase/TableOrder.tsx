import { createQueryString, SearchParams } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { ERole, EStatusOrder } from '@/app/common/enum';
import PaginationList from '@/components/PaginationList';
import Image from 'next/image';
import { updateStatusOrder } from '@/APIService/order/action';
import { getProfile } from '@/APIService/user/query';
import { getOrder } from '@/APIService/order/query';

interface IProps {
    queryParams: SearchParams;
}

export default async function TableOrder({ queryParams }: IProps) {

    const query = createQueryString(undefined, '', queryParams as any);
    const user = await getProfile()
    
   
    const { orders, count } = await getOrder(query);
    if(orders.length ===0){
        return (
            <Image src={'/images/no_order.jpg'} height={500} width={500} alt='not found order'  />
        )
    }

    return (
        <div className="  overflow-x-scroll scrollbar-hide md:overflow-x-auto  h-auto w-screen sm:w-full ">
            <Table className=" min-w-[500px]  mb-[50px] ">
                <TableHeader className=" ">
                    <TableRow>
                        <TableHead className="">Create Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Update Time</TableHead>
                        <TableHead className="">Cost</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {order.createAt}
                            </TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.updateAt}</TableCell>
                            <TableCell className="text-right flex flex-col ">
                                <div className=" inline-flex gap-3">
                                    <span className=" font-semibold">
                                        Subtotal:
                                    </span>
                                    <span> ${order.totalOrder.subTotal.toFixed(2)}</span>
                                </div>
                                {order.totalOrder.wrap && (
                                    <div className=" inline-flex gap-3">
                                        <span className=" font-semibold">
                                            Wrap:
                                        </span>
                                        <span> ${order.totalOrder.wrap}</span>
                                    </div>
                                )}

                                {order.totalOrder.shipping && (
                                    <div className=" inline-flex gap-3">
                                        <span className=" font-semibold">
                                            Shipping:
                                        </span>
                                        <span>
                                            {' '}
                                            ${order.totalOrder.shipping}
                                        </span>
                                    </div>
                                )}

                                <div className=" inline-flex gap-3">
                                    <span className=" font-semibold">
                                        Total:
                                    </span>
                                    <span>
                                     
                                        $
                                        {(Object.values(order.totalOrder).reduce(
                                            (sum, item) => sum + item,
                                            0,
                                        )).toFixed(2)}
                                    </span>
                                </div>
                            </TableCell>

                            <TableCell className=" ">
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
                                      {  order.status === EStatusOrder.PENDING && <li className="p-4 py-2 hover:bg-gray-100">
                                            <form
                                                action={async (formData: FormData) => {
                                                    'use server';
                                                   
                                                        await updateStatusOrder(
                                                            formData.get(
                                                                'orderId',
                                                            ) as string,EStatusOrder.CANCEL
                                                        );
                                                   
                                                }}
                                            >
                                                <input hidden readOnly name='orderId' value={order.id} type="text" />
                                                <button
                                                   
                                                    type="submit"
                                                >
                                                    Cancel
                                                </button>
                                            </form>
                                        </li>}

                                        {user?.role ===ERole.ADMIN &&  order.status === EStatusOrder.PENDING && <li className="p-4 py-2 hover:bg-gray-100">
                                            <form
                                                action={async (formData: FormData) => {
                                                    'use server';
                                                   
                                                        await updateStatusOrder(
                                                            formData.get(
                                                                'orderId',
                                                            ) as string,EStatusOrder.SHIPPING
                                                        );
                                                   
                                                }}
                                            >
                                                <input hidden readOnly name='orderId' value={order.id} type="text" />
                                                <button
                                                   
                                                    type="submit"
                                                >
                                                    Shipping
                                                </button>
                                            </form>
                                        </li>}

                                        {user?.role ===ERole.ADMIN &&  order.status === EStatusOrder.SHIPPING && <li className="p-4 py-2 hover:bg-gray-100">
                                            <form
                                                action={async (formData: FormData) => {
                                                    'use server';
                                                   
                                                        await updateStatusOrder(
                                                            formData.get(
                                                                'orderId',
                                                            ) as string,EStatusOrder.COMPLETE
                                                        );
                                                   
                                                }}
                                            >
                                                <input hidden readOnly name='orderId' value={order.id} type="text" />
                                                <button
                                                   
                                                    type="submit"
                                                >
                                                    Complete
                                                </button>
                                            </form>
                                        </li>}
                                    </ul>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                       <TableCell colSpan={5}> <PaginationList
                            queryParams={queryParams}
                            count={count}
                            limit={9}
                        /></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
