import { getAddress, getCart, getDistrictById, getProvinceById, getProvinces } from "@/lib/api";
import Subscribe from "../components/Subscribe";
import FormCheckout from "./components/FormCheckout";
import { Suspense } from "react";
import ListProduct from "./components/ListProduct";
import { redirect } from "next/navigation";
import { SearchParams } from "@/lib/utils";

interface IProps {
  searchParams : Promise<SearchParams>
}

export default async function CheckoutPage({searchParams}: IProps) {
    const cartItems = await getCart()
    if(cartItems.length ===0){
      redirect('/cart')
    }
  const queryParams = await searchParams
  const isWrap = queryParams['wrap'] as string || 'false'
  const provinceId = (queryParams['province'] as string)?.split('-i.')[1]
  const districtId = (queryParams['district'] as string)?.split('-i.')[1]
  const [provinces, province, district, address] = await Promise.all([
      getProvinces(),
      getProvinceById(provinceId),
      getDistrictById(provinceId, districtId),getAddress()
  ]);

  if (address && !provinceId) {
      const { province, district, commune } = address;
      const params = new URLSearchParams();

        params.set('wrap', isWrap)
     
      params.set('province', `${province.name}-i.${province.id}`);
      params.set('district', `${district.name}-i.${district.id}`);
      params.set('commune', `${commune.name}-i.${commune.id}`);
      redirect(`?${params.toString()}`)
  }
             
  
  
  return (
      <>
          <h1 className=" mb-[24px] md:mb-[36px] lg:mb-[44px] text-black text-center font-volkhov text-2xl md:text-[32px] md:leading-[32px] lg:text-[42px] lg:leading-[42px]">
              Checkout
          </h1>
          <section className=" justify-center w-full max-w-[1920px] mb-[24px]  py-[30px] md:py-[60px] lg:py-[80px] border-y-2 grid md:grid-cols-2">
              <FormCheckout
                  provinces={provinces}
                  queryParams={queryParams}
                  province={province}
                  district={district}
                  address={address}
              />
              <div className=" w-[92%] mx-auto  sm:w-[600px] md:w-auto  order-1 md:order-2 mb-[30px] md:mb-0" >
                      <ListProduct   cartItems={cartItems} queryParams={queryParams}  />
              </div>
          </section>
          <Subscribe />
      </>
  );
}
