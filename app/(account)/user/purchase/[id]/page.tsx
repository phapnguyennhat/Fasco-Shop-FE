import { getOrderById } from '@/lib/api';
import OrderItem from './OrderItem';
import AddressOrder from './AddressOrder';
import TotalOrder from './TotalOrder';
import StatusOrder from './StatusOrder';

interface IProps {
    params: Promise<{ id: string }>;
}
export default async function OrderDetail({ params }: IProps) {
    const { id } = await params;
    const order: IOrder = await getOrderById(id);
    const {address}= order

    return (
        <main className=" mx-3  lg:mx-5">
            <ul className=' mb-[30px]' >
                {order.orderItems.map((orderItem, index) => (
                    <OrderItem orderItem={orderItem} key={index} />
                ))}
            </ul>

            <AddressOrder address={address} order={order} />
            <div className='   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1  lg:grid-cols-2' >
                <StatusOrder order={order} />
                <TotalOrder totalOrder={order.totalOrder} />
            </div>
        </main>
    );
}
