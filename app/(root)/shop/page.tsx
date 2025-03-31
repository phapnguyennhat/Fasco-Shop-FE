import HeaderShop from "./HeaderShop";
import ListShop from "./ListShop";
import { Metadata } from "next";
import { delay } from "@/lib/utils";
import { getProfile } from "@/APIService/user/query";
import { getBrand } from "@/APIService/shop/query";

export const metadata: Metadata = {
  title: 'Cooperative Shops  ',
  description: 'Best online shopping deals for everyone',
};

// export const experimental_ppr = true;

export default async function ShopPage() {
  const {groupedShop,count} =  await getBrand()
  const user = await getProfile()

  return (
    <>
      <HeaderShop/>
      <ListShop role={user?.role} groupedShop={groupedShop} count={count}/>
    </>
  )
}
