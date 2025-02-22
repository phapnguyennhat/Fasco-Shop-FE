import { createQueryString, SearchParams } from "@/lib/utils"
import { QueryProduct } from "../page"
import { ChevronDown } from "lucide-react"
import { collections } from "@/app/common/constant"
import Link from "next/link"

interface IProps{
  queryParams: QueryProduct
}
export default function SelectCollection({queryParams}: IProps) {
  const {collection: selectedCollection}= queryParams
  
  return (
      <div className=" cursor-pointer group inline-flex gap-x-2 items-center relative ">
          <span className=" font-volkhov text-black">
              {' '}
              {selectedCollection || 'All Products'}
          </span>
          <ChevronDown />

          <ul className=" z-10 bg-white  top-[110%] w-[180px] left-0  shadow-md  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 absolute">
                  {collections.map((collection, index) => (
                      <li className=" px-4  py-2 hover:bg-gray-100"  key={index}>
                          <Link
                            replace={true}
                              href={`?${createQueryString(
                                  'collection',
                                  collection.value,
                                  queryParams as any,
                              )}`}
                          >
                              {collection.name}
                          </Link>
                      </li>
                  ))}
          </ul>
      </div>
  );
}
