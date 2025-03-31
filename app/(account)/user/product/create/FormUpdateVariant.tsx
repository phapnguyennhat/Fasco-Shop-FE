import { TableCell, TableRow } from '@/components/ui/table';
import { findValueNames } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useMemo } from 'react';

import {z} from 'zod'
import { UpdateVariantDto } from '@/schema/product';
interface IProps {
    indexVariant: number;
    field: ControllerRenderProps<any, 'updateVarientDtos'>;
    valueAttrs: IValueAttr[]
}
export default function FormUpdateVariant({
    indexVariant,
    field,
    valueAttrs
}: IProps) {

  const updateVariantDto = field.value[indexVariant]

    const { pieceAvail, price, discountPrice } = updateVariantDto;
    const valueNames = useMemo(()=>{
      const values = valueAttrs.map(item => item.value)
      return values.join('-')
    },[valueAttrs])

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
                {valueNames}
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
