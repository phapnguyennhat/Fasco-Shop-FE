import { getAddress, getDistrictById, getProvinceById, getProvinces } from "@/lib/api"
import { SearchParams } from "@/lib/utils"
import { redirect } from "next/navigation"
import FormAddress from "./FormAddress"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "User's Address",
  description: 'Manage your address',
};

interface IProps {
  searchParams: Promise<SearchParams>
}
export default async function Address({searchParams}: IProps) {

  const queryParams = await searchParams
    const provinceId = (queryParams['province'] as string)?.split('-i.')[1]
    const districtId = (queryParams['district'] as string)?.split('-i.')[1]
    const [provinces, province, district, address] = await Promise.all([
        getProvinces(),
        getProvinceById(provinceId),
        getDistrictById(provinceId, districtId),getAddress()
    ]);
  
    if (address && !queryParams['province']) {
        const { province, district, commune } = address;
        const params = new URLSearchParams(searchParams.toString());
        params.set('province', `${province.name}-i.${province.id}`);
        params.set('district', `${district.name}-i.${district.id}`);
        params.set('commune', `${commune.name}-i.${commune.id}`);
        redirect(`?${params.toString()}`)
    }

   


  return (
      <main className=" w-full">
          <div className="   pl-4 pb-[18px] w-full mb-[30px] border-b  ">
              <h2 className="  text-[#333] text-lg">Your Address</h2>
              <p className="text-sm text-[#555]">
                  This is your default address when your order products
              </p>
          </div>

          <FormAddress  address={address} provinces={provinces} province={province} district={district} queryParams={queryParams} /> 
      </main>
  );
}
