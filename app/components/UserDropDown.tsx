
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';
import { KeyRound, MapPinHouse } from 'lucide-react';
import { ERole } from '../common/enum';
import { MdOutlineEventNote } from 'react-icons/md';


interface IProps {
    profile: User
}
export default function UserDropDown({profile}: IProps) {
    return (
        <li className=" md:hidden   border-b-2  transition-all duration-300 hover:text-gray-500  px-4 py-3  w-full">
            <Accordion type="single" collapsible className="w-full  ">
                <AccordionItem value="item-1">
                    <AccordionTrigger className=" font-normal text-base">
                        {profile.role === ERole.USER ? 'User' : 'Admin'}
                    </AccordionTrigger>
                    <AccordionContent className=" ">
                        <ul>
                            <li className=" border-b-2 hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-2 py-3  w-full">
                                <Link
                                    className=" flex items-center justify-between"
                                    href={'/user/profile'}
                                >
                                    Profile
                                    <Image
                                        src={'/icons/user.svg'}
                                        width={20}
                                        height={20}
                                        className=" size-[20px]"
                                        alt="user icon"
                                    />
                                </Link>
                            </li>

                            <li className=" border-b-2 hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-2 py-3  w-full">
                                <Link
                                    className=" flex items-center justify-between"
                                    href={'/user/purchase'}
                                >
                                    Order
                                    <MdOutlineEventNote size={20} />
                                </Link>
                            </li>
                            {profile.role === ERole.USER && (
                                <li className="  border-b-2 hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-2 py-3  w-full">
                                    <Link
                                        className=" flex justify-between items-center"
                                        href={'/user/favorite'}
                                    >
                                        Favorite
                                        <Image
                                            src={'/icons/favorite.svg'}
                                            width={20}
                                            height={20}
                                            alt="favorite icon"
                                            className=" size-[20px]"
                                        />
                                    </Link>
                                </li>
                            )}
                            <li className="  border-b-2 hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-2 py-3  w-full">
                                <Link
                                    className=" flex justify-between items-center"
                                    href={'/user/address'}
                                >
                                    {' '}
                                    Address
                                    <MapPinHouse size={20} />
                                </Link>
                            </li>

                            {profile.role === ERole.USER && (
                                <li className="border-b-2   hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-2 py-3  w-full">
                                    <Link
                                        className=" flex items-center justify-between"
                                        href={'/cart'}
                                    >
                                        {' '}
                                        My Cart
                                        <Image
                                            src={'/icons/cartuser.svg'}
                                            width={20}
                                            height={20}
                                            alt="cart icon"
                                            className=" size-[20px]"
                                        />
                                    </Link>
                                </li>
                            )}

                            <li className="   hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-2 pt-3  w-full">
                                <Link
                                    className=" flex justify-between items-center"
                                    href={'/user/password'}
                                >
                                    {' '}
                                    Change Password
                                    <KeyRound size={20} />
                                </Link>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </li>
    );
}
