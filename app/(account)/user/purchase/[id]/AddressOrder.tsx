import { EStatusOrder } from "@/app/common/enum";
import Link from "next/link"


interface IProps {
    address :IAddress
    order: IOrder
}
export default function AddressOrder({address, order}: IProps) {
    const{commune, district, province} = address
    const {status, id} = order
  return (
      <div className=" mb-[30px]" >
          <h6 className=" mb-[20px] font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
              Address
          </h6>
          <div className=" flex justify-between items-center ">
              {' '}
              <div className=" inline-flex  gap-2">
                  <span className=" text-black">{address.fullName}</span>
                  <div className=" border-l-2" />
                  <span className=" ">{address.phoneNumber}</span>
              </div>
          { status===EStatusOrder.PENDING &&   <Link
                    
                  className=" button-black"
                  href={`/user/purchase/${id}/address`}
              >
                  Edit
              </Link>}
          </div>

          <div>{address.street}</div>
          <div>{`${commune.name}, ${district.name}, ${province.name}`}</div>
      </div>
  );
}
