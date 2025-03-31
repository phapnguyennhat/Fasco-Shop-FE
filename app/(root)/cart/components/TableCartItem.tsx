import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableContent from "./TableContent"
import TotalCart from "./TotalCart"
import { SearchParams } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { getCart } from "@/APIService/cart/query"


interface IProps {
  searchParams: Promise<SearchParams>
}
export default async function TableCartItem({searchParams}: IProps) {
  // const headers = ['Product', 'Price', 'Quantity', 'Total']
  const cartItems : ICartItem[] = await getCart()

  if(cartItems.length ===0){
    return (
      <section className=" flex flex-col justify-center items-center   section-page_home" >
        <Image src={'https://skoozo.com/assets/img/empty-cart.png'} alt=" not found cart items" width={534} height={428} className=" "  />
      </section>
    )
  }
  
  return (
      <section className=" mb-[20px]  md:mb-[26px]  lg:mb-[30px]   section-page_home">
          <Table className=" min-w-[530px]  md:min-w-[830px]">
              <TableHeader className="    border-b-2 font-volkhov leading-[22px] md:text-lg  lg:text-[22px]">
                  <TableRow className=" ">
                      <TableHead className=" md:pb-[18px] lg:pb-[35px] w-[230px]  md:w-[400px] text-black">
                          Product
                      </TableHead>
                      <TableHead className="md:pb-[18px] lg:pb-[35px] text-black">
                          Price
                      </TableHead>
                      <TableHead className="md:pb-[18px] lg:pb-[35px] text-black">
                          Quantity
                      </TableHead>
                      <TableHead className=" md:pb-[18px] lg:pb-[35px] w-[80px] text-black text-right">
                          Total
                      </TableHead>
                  </TableRow>
              </TableHeader>
              <TableContent cartItems={cartItems} />
          </Table>
          <TotalCart searchParams={searchParams} />
      </section>
  );
}
