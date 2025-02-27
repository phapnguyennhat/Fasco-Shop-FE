import { TableCell, TableRow } from '@/components/ui/table';
import { UpdateAttrProductDto, UpdateVariantDto, varientSchema } from '../edit/[id]/schema';
import { findValueNames } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

import {z} from 'zod'
interface IProps {
    indexVariant: number;
    updateVariantDto: UpdateVariantDto;
    updateAttrProductDtos: UpdateAttrProductDto[];
    field: ControllerRenderProps<any, 'updateVarientDtos'>;
}
export default function FormUpdateVariant({
    indexVariant,
    updateVariantDto,
    updateAttrProductDtos,
    field,
}: IProps) {



    const { valueIds, pieceAvail, price, discountPrice } = updateVariantDto;

     const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
            const newUpdateVarientDtos = [... field.value ] as UpdateVariantDto[]
            if (e.target.value && isNaN(parseInt(e.target.value))) {
                return;
            }
            if (parseInt(e.target.value) < 1) {
              newUpdateVarientDtos[indexVariant].price = '1'
            } else {
              newUpdateVarientDtos[indexVariant].price = e.target.value
            }
            field.onChange(newUpdateVarientDtos)
        };

        const handleChangePieceAvail = (e: ChangeEvent<HTMLInputElement>) => {
          const newUpdateVarientDtos = [... field.value ] as UpdateVariantDto[]
          if (e.target.value && isNaN(parseInt(e.target.value))) {
              return;
          }
          if (parseInt(e.target.value) < 1) {
            newUpdateVarientDtos[indexVariant].pieceAvail = '1'
          } else {
            newUpdateVarientDtos[indexVariant].pieceAvail = e.target.value
          }
          field.onChange(newUpdateVarientDtos)
      };

      const handleChangeDiscountPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const newUpdateVarientDtos = [... field.value ] as UpdateVariantDto[]
        if (e.target.value && isNaN(parseInt(e.target.value))) {
            return;
        }
        if (parseInt(e.target.value) > parseInt(price)) {
          newUpdateVarientDtos[indexVariant].discountPrice = price
        } else {
          newUpdateVarientDtos[indexVariant].discountPrice = e.target.value
        }
        field.onChange(newUpdateVarientDtos)
    };


    const disableDiscount = price===''


    return (
        <TableRow>
            <TableCell>
                {findValueNames(valueIds, updateAttrProductDtos)}
            </TableCell>
            <TableCell>
                <Input onChange={handleChangePrice} name="price"  value={price} />
            </TableCell>
            <TableCell>
                <Input onChange={handleChangePieceAvail} name='pieceAvail' value={pieceAvail} />
            </TableCell>
            <TableCell>
                <Input disabled={disableDiscount}  onChange={handleChangeDiscountPrice} name='discountPrice' value={discountPrice || ''} />
            </TableCell>
        </TableRow>
    );
}
