'use client';

import { FaCheck } from 'react-icons/fa';
import { memo } from 'react';

interface IProps {
    openSuccess: boolean;
    setOpenSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}
function ShowAddSuccess({ openSuccess, setOpenSuccess }: IProps) {
    return (
        <div className={` fixed bottom-0 left-0 transition-all duration-300 transform    ease-in-out right-0 top-0 z-30 flex items-center justify-center bg-transparent ${
          openSuccess ? 'visible opacity-100 ' : 'invisible opacity-0 '
      } `}>
            <div
                onClick={() => setOpenSuccess(false)}
                className="absolute bottom-0 left-0  right-0 top-0 z-0 flex items-center justify-center bg-transparent"
            ></div>
            <div
                className={` min-w-[360px]  md:min-w-[425px] right-[50%]  z-50    rounded-lg bg-black/70 p-5 `}
            >
                <div className="mb-5 flex justify-center">
                    {' '}
                    <div className="rounded-full bg-white p-5">
                        {' '}
                        <FaCheck color="black" size={50} />
                    </div>
                </div>
                <p className=" text-white select-none text-center text-base">
                    Item has been added to your shopping cart
                </p>
            </div>
            <div />
        </div>
    );
}

export default memo(ShowAddSuccess);