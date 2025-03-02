import { getBrand, getProfile } from "@/lib/api";
import HeaderShop from "./HeaderShop";
import ListShop from "./ListShop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cooperative Shops  ',
  description: 'Best online shopping deals for everyone',
};

export const experimental_ppr = true;

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
