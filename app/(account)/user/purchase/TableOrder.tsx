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
import { updateStatusOrder } from '@/API/order/action';
import { getProfile } from '@/API/user/query';
import { getOrder } from '@/API/order/query';
import { OrderRow } from './OrderRow';
interface IProps {
    queryParams: SearchParams;
}

export default async function TableOrder({ queryParams }: IProps) {

    const query = createQueryString(undefined, '', queryParams as any);


    const { orders, count } = await getOrder(query);
    if (orders.length === 0) {
        return (
            <Image src={'/images/no_order.jpg'} height={500} width={500} alt='not found order' />
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
                    {orders.map((order) => (
                        <OrderRow key={order.id} order={order} />
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
