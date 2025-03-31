import OrderItem from './OrderItem';
import AddressOrder from './AddressOrder';
import TotalOrder from './TotalOrder';
import StatusOrder from './StatusOrder';

export const metadata: Metadata = {
    title: 'Order detail',
    description: 'Manage your order detail',
  };

import Image from 'next/image';
import { Metadata } from 'next';
import { getProfile } from '@/api/user/query';
import { getOrderById } from '@/api/order/query';
interface IProps {
    params: Promise<{ id: string }>;
}


export default async function OrderDetail({ params }: IProps) {
    const { id } = await params;

    const [order, user]  = await Promise.all([getOrderById(id), getProfile()])
    const {address}= order

    return (
        <main className=" mx-3 w-full  lg:mx-5">
            {order.orderItems.length === 0 ? (
                <Image
                    src={'/images/no_product.png'}
                    width={500}
                    height={500}
                    className=" mx-auto"
                    alt="not found product"
                />
            ) : (
                <ul className=" mb-[30px]">
                    {order.orderItems.map((orderItem, index) => (
                        <OrderItem orderItem={orderItem} key={index} />
                    ))}
                </ul>
            )}

            <AddressOrder address={address} order={order} user={user} />
            <div className="   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1  lg:grid-cols-2">
                <StatusOrder order={order} />
                <TotalOrder totalOrder={order.totalOrder} />
            </div>
        </main>
    );
}
