import { SearchParams } from "@/lib/utils";
import { redirect } from "next/navigation";
import FormUpdateAddressOrder from "./FormUpdateAddressOrder";
import { Metadata } from "next";
import { ERole } from "@/app/common/enum";
import { getProfile } from "@/api/user/query";
import { getDistrictById, getProvinceById, getProvinces } from "@/api/province/query";
import { getOrderById } from "@/api/order/query";


export const metadata: Metadata = {
    title: "Order's Address",
    description: "Update Order's Address",
  };

interface IProps {
  params: Promise<{id: string}>
    searchParams: Promise<SearchParams>
  

}
export default async function AddressOrder({params, searchParams}: IProps) {
  const {id} = await params
  const queryParams = await searchParams
  const provinceId = (queryParams['province'] as string)?.split('-i.')[1];
  const districtId = (queryParams['district'] as string)?.split('-i.')[1];
  const [provinces, province, district,order, user] = await Promise.all([
      getProvinces(),
      getProvinceById(provinceId),
      getDistrictById(provinceId, districtId),
      getOrderById(id),getProfile()
  ]);

  if(user?.role ===ERole.ADMIN){
    redirect('/user/purchase')
  }
  const {address}= order

  if (address && !queryParams['province']) {
      const { province, district, commune } = address;
      const params = new URLSearchParams(searchParams.toString());
      params.set('province', `${province.name}-i.${province.id}`);
      params.set('district', `${district.name}-i.${district.id}`);
      params.set('commune', `${commune.name}-i.${commune.id}`);
      redirect(`?${params.toString()}`);
  }
 
  return (
      <main className=" w-full">
          <div className="   pl-4 pb-[18px] w-full mb-[30px] border-b  ">
              <h2 className="  text-[#333] text-lg">Address Order</h2>
              <p className="text-sm text-[#555]">
                  This is address of order whose id is {id}
              </p>
          </div>

          <FormUpdateAddressOrder
              address={address}
              provinces={provinces}
              province={province}
              district={district}
              queryParams={queryParams}
          />
      </main>
  );
}
