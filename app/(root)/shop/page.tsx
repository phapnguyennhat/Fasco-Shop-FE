import { getBrand, getProfile } from "@/lib/api";
import HeaderShop from "./HeaderShop";
import InitCharShop from "./InitCharShop";
import ListShop from "./ListShop";


export default async function ShopPage() {
  const {groupedShop,count} =  await getBrand()
  const user = await getProfile()

  return (
    <>
      <HeaderShop/>
      {/* <InitCharShop groupedShop={groupedShop} count={count} /> */}
      <ListShop role={user?.role} groupedShop={groupedShop} count={count}/>
    </>
  )
}
