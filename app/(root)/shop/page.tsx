import { getBrand } from "@/lib/api";
import HeaderShop from "./HeaderShop";
import InitCharShop from "./InitCharShop";
import ListShop from "./ListShop";


export default async function ShopPage() {
  const {groupedShop,count} =  await getBrand()
  return (
    <>
      <HeaderShop/>
      {/* <InitCharShop groupedShop={groupedShop} count={count} /> */}
      <ListShop groupedShop={groupedShop} count={count}/>
    </>
  )
}
