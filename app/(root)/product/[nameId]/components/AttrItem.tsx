'use client';

import { setShowImage } from '@/lib/features/ImageProduct/imageProductSlice';
import { createQueryString, SearchParams } from '@/lib/utils';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

interface IProps {
    attrProduct: IAttrProduct;
    queryParams: SearchParams;
}
export default function AttrItem({ attrProduct, queryParams }: IProps) {
    const value =
        queryParams[attrProduct.name] || attrProduct.valueAttrs[0].value;
    const dispatch = useDispatch()

        const handleHover= (valueAttr: IValueAttr)=>{
          if(valueAttr.image){
            dispatch(setShowImage(valueAttr.image.url))
          }
        }

    return (
        <li className=' mb-[19px]' >
            <h6 className="font-volkhov mb-[12px]  text-[#000]">
                <span className=" font-bold">{`${attrProduct.name} :`}</span>
                <span className="">{' '}{value}</span>
            </h6>
            <ul className=" flex flex-wrap gap-[10px] ">
                {attrProduct.valueAttrs.map((valueAttr, index) => (
                    <li
                       onMouseEnter={()=>handleHover(valueAttr)}
                        className={`${
                            value === valueAttr.value
                                ? ' bg-black text-white '
                                : ' border  text-black'
                        } select-none rounded-[5px] px-[15px] py-[9px] hover:scale-105 hover:border-black transition-all duration-300`}
                        key={index}
                    >
                        <Link

                         scroll={false} replace={true} 
                          href={`?${createQueryString(attrProduct.name, valueAttr.value, queryParams as any)}`}
                         >{valueAttr.value}</Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}
