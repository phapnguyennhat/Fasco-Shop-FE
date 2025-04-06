'use client';
import { useEffect, useState } from 'react';
import { AlignJustify, BadgePlus, PackagePlus, Tag, Bell } from 'lucide-react'; // Nếu bạn dùng Lucide Icons
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { link } from 'fs';
import { House } from 'lucide-react';
import { Store } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import UserDropDown from './UserDropDown';
import SearchNav from './SearchNav';
import { ECollection, ERole } from '../common/enum';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { logout } from '@/API/auth/action';
import Notification from './Notification';
export default function MenuSide({ profile , cartItems }: { profile: User | undefined, cartItems: ICartItem[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const dispatch = useDispatch()

    const handleLogout = async () =>{
        try {
            dispatch(setSpinner(true))
            await logout()
            dispatch(setSpinner(false))
        } catch (error) {
            dispatch(setSpinner(false))
        }
    }
    
    useEffect(()=>{
        setIsOpen(false)
    },[pathName, searchParams.toString()])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const cartNumber  = Math.min(cartItems.length, 9)

    const itemsNav: { name: string; link: string; icon?: any }[] = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Deals',
            link: '/product?collection=Deals' ,
        },
        {
            name: 'New Arrivals',
            link: `/product?collection=${ECollection.NEWARRIVAL}`,
        },
    ];

    const itemsNavAuth: { name: string; link: string; icon?: any }[] = [
        {
            name: 'Home',
            link: '/',
            icon: <House size={20} />,
        },
        {
            name: 'Shop',
            link: '/shop',
            icon: <Store size={20} />,
        },
        {
            name: 'Products',
            link: '/product',
            icon: <ShoppingBag size={20} />,
        },
        {
            name: "Category & Tag",
            link: '/category',
            icon:   <Tag size={20} />
        }
    ];

    return (
        <div
            className={`${
                profile ? 'lg:flex' : 'lg:hidden'
            }    relative flex items-center`}
        >
            {profile && (
                <ul className=" flex items-center gap-2 md:gap-4 lg:gap-6 mr-3 ">
                    <SearchNav />
                    <li className=" hidden md:block  py-[19px]">
                        <Link href={'/user/profile'}>
                            <Image
                                src={'/icons/user.svg'}
                                width={20}
                                height={20}
                                className=" size-[20px]"
                                alt="user icon"
                            />
                        </Link>
                    </li>
                    {profile.role === ERole.USER && (
                        <li className=" hidden md:block py-[19px]">
                            <Link href={'/user/favorite'}>
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
                    {profile.role === ERole.USER && (
                        <li
                            className={`relative hidden md:block  ${
                                cartNumber === 0 ? 'mr-0' : 'mr-2'
                            }   `}
                        >
                            <Link href={'/cart'}>
                                <Image
                                    src={'/icons/cartuser.svg'}
                                    width={20}
                                    height={20}
                                    alt="cart icon"
                                    className=" size-[20px]"
                                />
                            </Link>
                            <div
                                className={`${
                                    cartNumber === 0 && 'hidden'
                                } font-volkhov  items-center text-white bg-red-500 w-[24px] h-[24px] flex justify-center  rounded-full absolute -right-[20px] -top-[10px] `}
                            >
                                {cartNumber}
                            </div>
                        </li>
                    )}

                    <li className=" cursor-pointer block py-[19px]">
                       
                           <Notification/>
                    </li>

                    {profile.role === ERole.ADMIN && (
                        <li className=" hidden md:block py-[19px]">
                            <Link href={'/user/product/create'}>
                            <PackagePlus size={20} />
                            </Link>
                        </li>
                    )}

                    <li className="size-[20px] hidden lg:block ">
                        <button
                            onClick={handleLogout}
                            type="submit"
                            className=" text-gray-600"
                        >
                            <LogOut size={20} />
                        </button>
                    </li>
                </ul>
            )}

            <button className=" lg:hidden" onClick={toggleMenu}>
                <AlignJustify className="size-[20px] sm:size-[30px]" />
            </button>

            {/* Menu trượt */}
            <aside
                className={`fixed overflow-y-auto z-30 lg:hidden -top-[20px] md:-top-[30px] left-0  h-screen  w-64 bg-white  transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <div className=" mt-[20px] ">
                    <Link href={'/'} className=" logo mx-4 sm:mx-4">
                        Fasco
                    </Link>
                    <div className=" mt-2   ">
                        <ul className="flex flex-col  mx-2  ">
                            {(profile ? itemsNavAuth : itemsNav).map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className="  border-b-2 hover:bg-gray-100 transition-all duration-300 hover:text-gray-500  px-4 py-3  w-full"
                                    >
                                        <Link
                                            className=" flex items-center justify-between"
                                            href={item.link}
                                        >
                                            {item.name}
                                            {item?.icon}
                                        </Link>
                                    </li>
                                ),
                            )}

                            {profile && <UserDropDown profile={profile} />}
                        </ul>
                        {profile ? (
                            <button
                                onClick={handleLogout}
                                className="  px-6 py-3 flex items-center w-full justify-between hover:bg-gray-100 transition-all duration-300 "
                                type="button"
                            >
                                Logout
                                <LogOut size={20} color="red" />
                            </button>
                        ) : (
                            <div className=" w-full inline-flex justify-between p-4   ">
                                <Link
                                    href={'/register'}
                                    className="button-black min-w-[110px]"
                                >
                                    Sign up
                                </Link>
                                <Link
                                    href={'/login'}
                                    className=" button-black min-w-[110px] "
                                >
                                    Sign in
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Overlay mờ (khi menu mở) */}
            {isOpen && (
                <div
                    className="fixed h-screen inset-0 -top-[20px] md:-top-[30px] z-20 bg-black bg-opacity-50"
                    onClick={toggleMenu}
                ></div>
            )}
        </div>
    );
}
