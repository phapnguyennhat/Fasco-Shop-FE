'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { initVarients } from '@/lib/features/variant/variantSlice';
import { RootState } from '@/lib/store';
import { cartesianProduct } from '@/lib/utils';
import { Item } from '@radix-ui/react-accordion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormCreateVariant from './FormCreateVariant';


export default function TableVarient() {

  const values = useSelector((state :RootState)=>state.attrProduct.value.values)
  
  
  const variations = cartesianProduct(values)
  useEffect(() => {
      dispatch(initVarients({ variations }));
  }, [values]);

  
  const dispatch = useDispatch()
  const variants = useSelector((state: RootState)=>state.variant.value.variants)

    return (
        <div className=' md:pt-4'>
            <div className="   mb-[16px] items-center w-full  inline-flex justify-between">
                <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                    Variants
                </h6>
            </div>

            <Table className='' >
              <TableHeader>
                <TableRow>
                  <TableHead>Variation</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available quantity</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {
                  variants.map((variant,index) =>(
                    <FormCreateVariant key={index} indexVariant={index} variant={variant} />
                  ))
                }

              </TableBody>
            </Table>
        </div>
    );
}
