import { SearchParams } from "@/lib/utils";
import Subscribe from "../components/Subscribe";
import HeaderCart from "./components/HeaderCart";
import TableCartItem from "./components/TableCartItem";
import TotalCart from "./components/TotalCart";

export default function CartPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  return (
    <>
      <HeaderCart/>
      <TableCartItem searchParams={searchParams} />
      {/* <TotalCart searchParams={searchParams} /> */}
      <Subscribe/>
    </>
  )
}
