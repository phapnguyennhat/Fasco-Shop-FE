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

export default function TableCartItem() {
  const headers = ['Product', 'Price', 'Quantity', 'Total']
  return (
    <section className='  mb-[40px] lg:mb-[70px]     section-page_home' >
      <Table className=" min-w-[530px]  md:min-w-[830px]" >
      <TableHeader className= "    border-b-2 font-volkhov leading-[22px] md:text-lg  lg:text-[22px]" >
        <TableRow className=" "  >
          <TableHead className=" md:pb-[18px] lg:pb-[35px] w-[230px]  md:w-[400px] text-black">Product</TableHead>
          <TableHead className="md:pb-[18px] lg:pb-[35px] text-black">Price</TableHead>
          <TableHead className="md:pb-[18px] lg:pb-[35px] text-black" >Quantity</TableHead>
          <TableHead className=" md:pb-[18px] lg:pb-[35px] w-[80px] text-black text-right" >Total</TableHead>
        </TableRow>
      </TableHeader>
     <TableContent/>
     
    </Table>
    </section>
  )
}
