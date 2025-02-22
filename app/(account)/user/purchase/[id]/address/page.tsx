import { getDistrictById, getOrderById, getProvinceById, getProvinces } from "@/lib/api";
import { SearchParams } from "@/lib/utils";
import { redirect } from "next/navigation";
import FormAddress from "../../../address/FormAddress";
import { updateAddressOrder } from "@/app/action";
import FormUpdateAddressOrder from "./FormUpdateAddressOrder";

interface IProps {
  params: Promise<{id: string}>
    searchParams: Promise<SearchParams>
  

}
export default async function AddressOrder({params, searchParams}: IProps) {
  const {id} = await params
  const queryParams = await searchParams
  const provinceId = (queryParams['province'] as string)?.split('-i.')[1];
  const districtId = (queryParams['district'] as string)?.split('-i.')[1];
  const [provinces, province, district] = await Promise.all([
      getProvinces(),
      getProvinceById(provinceId),
      getDistrictById(provinceId, districtId),
  ]);

  const order: IOrder = await getOrderById(id);
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
