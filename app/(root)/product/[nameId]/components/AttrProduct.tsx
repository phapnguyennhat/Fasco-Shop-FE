import { SearchParams } from "@/lib/utils"
import AttrItem from "./AttrItem"


interface IProps {
  attrProducts: IAttrProduct[]
  searchParams: Promise<SearchParams>
}
export default async function AttrProduct({attrProducts, searchParams}: IProps) {
  const  queryParams = await searchParams
  return (
    <ul className=" lg:mt-[26px]" >
      {attrProducts.map((attrProduct, index)=>(
       <AttrItem key={index} attrProduct={attrProduct} queryParams={queryParams} />
      ))}
    </ul>
  )
}
