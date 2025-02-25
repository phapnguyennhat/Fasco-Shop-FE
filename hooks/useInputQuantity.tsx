'use client';

import { useCallback } from 'react';

interface IProps {
    setQuantity: React.Dispatch<React.SetStateAction<string>>;
    maxQuantity: number;
}
export default function useInputQuantity({
    setQuantity,
    maxQuantity,
}: IProps) {
    const handleMinus = useCallback(() => {
        setQuantity((prev) => {
            if (parseInt(prev) <=1) {
              return '1'
            }
            return (parseInt(prev) - 1).toString();
        });
    }, []);
    const handlePlus = useCallback(() => {
        setQuantity((prev) => {
            if (parseInt(prev) >= maxQuantity) {
                return maxQuantity.toString();
            }
            return (parseInt(prev) + 1).toString();
        });
    }, []);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            
            if (parseInt(e.target.value) < 1) {
                setQuantity('1');
            } else if (parseInt(e.target.value) > maxQuantity) {
                setQuantity(maxQuantity.toString());
            } else if (e.target.value && !isNaN(Number(e.target.value)) && Number.isInteger(Number(e.target.value))) {

                setQuantity(e.target.value);
            }
        },
        [maxQuantity],
    );

    const handleOnBlur = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.value) {
                setQuantity('1');
            }
        },
        [],
    );

    return { handleMinus, handlePlus, handleChange, handleOnBlur };
}