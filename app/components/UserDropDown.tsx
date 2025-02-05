
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';

export default function UserDropDown() {
    return (
        <li className=" md:hidden   border-b-2  transition-all duration-300 hover:text-gray-500  px-4 py-3  w-full">
            <Accordion type="single" collapsible className="w-full  ">
                <AccordionItem value="item-1">
                    <AccordionTrigger className=" font-normal text-base">
                        User
                    </AccordionTrigger>
                    <AccordionContent className=' ' >
                        <ul>
                            <li className=" border-b-2 hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-4 py-3  w-full">
                                <Link
                                    className=" flex items-center justify-between"
                                    href={'/profile'}
                                >
                                    Profile
                                    <Image
                                        src={'/icons/user.png'}
                                        width={20}
                                        height={20}
                                        className=" size-[20px]"
                                        alt="user icon"
                                    />
                                </Link>
                            </li>
                            <li className="  border-b-2 hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-4 py-3  w-full">
                                <Link
                                    className=" flex justify-between items-center"
                                    href={'/profile'}
                                >
                                    {' '}
                                    Products favorite
                                    <Image
                                        src={'/icons/favorite.png'}
                                        width={20}
                                        height={20}
                                        alt="favorite icon"
                                        className=" size-[20px]"
                                    />
                                </Link>
                            </li>
                            <li className="   hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-4 pt-3  w-full">
                                <Link
                                    className=" flex items-center justify-between"
                                    href={'/profile'}
                                >
                                    {' '}
                                    My Cart
                                    <Image
                                        src={'/icons/cartuser.png'}
                                        width={20}
                                        height={20}
                                        alt="cart icon"
                                        className=" size-[20px]"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </li>
    );
}
