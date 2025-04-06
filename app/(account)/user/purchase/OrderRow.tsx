import { getProfile } from "@/API/user/query";
import { EStatusOrder } from "@/app/common/enum";
import { TableCell } from "@/components/ui/table";

import { TableRow } from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { ActionOrder } from "./ActionOrder";

    interface IProps {
    order: IOrder

}
export async function OrderRow({ order }: IProps) {

    const user = await getProfile()


    return (
        <TableRow >
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
                                    <ActionOrder order={order}  user={user as User}/>
                            </TableCell>
                        </TableRow>
    )
}