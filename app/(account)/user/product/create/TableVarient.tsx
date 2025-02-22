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
import { RootState } from '@/lib/store';
import { cartesianProduct } from '@/lib/utils';
import { Item } from '@radix-ui/react-accordion';
import { useSelector } from 'react-redux';


export default function TableVarient() {

  const values = useSelector((state :RootState)=>state.attrProduct.value.values)


  const variations = cartesianProduct(values)
  
  
    return (
        <div>
            <div className="   mb-[16px] items-center w-full  inline-flex justify-between">
                <h6 className=" font-volkhov text-2xl sm:text-[30px] md:leading-[30px] lg:text-[36px] lg:leading-[36px] ">
                    Variants
                </h6>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variation</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Available quantity</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {
                  variations.map(variation =>(
                    <TableRow key={variation.join('-')} >
                      <TableCell>{variation.join('-')}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
        </div>
    );
}
