import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import {
    setPieceAvail,
    setPrice,
} from '@/lib/features/variant/variantSlice';
import { RootState } from '@/lib/store';
import { ICreateVarient } from '@/schema/product';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
    indexVariant: number;
    variant: ICreateVarient;
}

export default function FormCreateVariant({ indexVariant, variant }: IProps) {
    const dispatch = useDispatch();

    const createVariant = useSelector(
        (state: RootState) => state.variant.value.variants[indexVariant],
    );

    const { pieceAvail, price, attrValueNames } = createVariant;

    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value && isNaN(parseInt(e.target.value))) {
            return;
        }
        if (parseInt(e.target.value) < 1) {
            dispatch(setPrice({ indexVariant, price: '1' }));
        } else {
            dispatch(setPrice({ indexVariant, price: e.target.value }));
        }
    };

    const handleChangePieceAvail = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value && isNaN(parseInt(e.target.value))) {
            return;
        }
        if (parseInt(e.target.value) < 1) {
            dispatch(setPieceAvail({ indexVariant, pieceAvail: '1' }));
        } else if (parseInt(e.target.value) > 1000) {
            dispatch(setPieceAvail({ indexVariant, pieceAvail: '1000' }));
        } else {
            dispatch(
                setPieceAvail({ indexVariant, pieceAvail: e.target.value }),
            );
        }
    };


    return (
        <TableRow>
            <TableCell>{attrValueNames.join('-')}</TableCell>
            <TableCell>
                <Input
                    disabled= {variant.attrValueNames.includes('')}
                    className=" text-center"
                    value={price}
                    onChange={handleChangePrice}
                    type="text"
                />
            </TableCell>
            <TableCell>
                <Input
                    disabled= {attrValueNames.includes('')}
                    className=" text-center"
                    value={pieceAvail}
                    onChange={handleChangePieceAvail}
                    type="text"
                />
            </TableCell>
        </TableRow>
    );
}
