import { Input } from '@/components/ui/input';
import { setValue } from '@/lib/features/attrProduct/attrProductSlice';
import { RootState } from '@/lib/store';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
    indexAttr: number;
    indexValue: number;
    attrValue: IValueAttr;
}

export default function FormUpdateValue({
    attrValue,
    indexAttr,
    indexValue,
}: IProps) {
    const dispatch = useDispatch();
    const values = useSelector(
        (state: RootState) => state.attrProduct.value.values,
    );
    const value = values[indexAttr][indexValue];


    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setValue({ indexAttr, indexValue, value: e.target.value }));
    };

    return (
        <div className=" flex md:justify-between items-center">
            <Input
                onChange={onChangeValue}
                value={value}
                className="  w-[70%] md:w-full  bg-white"
                placeholder="value"
            />
        </div>
    );
}
