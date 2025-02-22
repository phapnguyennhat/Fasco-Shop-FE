'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PackagePlus, PencilLine, Star, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPinHouse } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { AuthBy, ERole } from '@/app/common/enum';
import { MdOutlineEventNote } from 'react-icons/md';

interface IProps {
    user: User | undefined;
}

export default function NavSide({ user }: IProps) {
    const pathname = usePathname();

    return (
        <aside className=" bg-gray-50  min-w-[230px] hidden  md:flex flex-col">
            <div className=" p-4 inline-flex gap-3 mb-[15px]  items-center">
                <Avatar>
                    <AvatarImage
                        src={user?.avatar?.url || '/images/default_avt.png'}
                        alt="avatar user"
                    />
                    <AvatarFallback>FC</AvatarFallback>
                </Avatar>
                <div className=" flex flex-col">
                    <span className="text-black">{user?.username}</span>
                    <Link href='/user/profile' className=" inline-flex items-center gap-3 text-[#888]">
                        <PencilLine /> <span>Edit profile</span>{' '}
                    </Link>
                </div>
            </div>

            <div className="  flex flex-col">
                <Link
                    className={`${
                        pathname.includes('profile') && 'text-black'
                    } inline-flex gap-3 py-2 px-4 hover:bg-gray-200 transition-all duration-300 hover:text-black`}
                    href={'/user/profile'}
                >
                    <UserRound size={20} />
                    Profile
                </Link>

                { user?.role===ERole.ADMIN  && <Link
                    className={`${
                        pathname.includes('product/create') && 'text-black'
                    } inline-flex gap-3 py-2 px-4 hover:bg-gray-200 transition-all duration-300 hover:text-black  `}
                    href={'/user/product/create'}
                >
                    <PackagePlus size={20} />
                    Create Product
                </Link>}

                <Link
                    className={`${
                        pathname.includes('purchase') && 'text-black'
                    } inline-flex gap-3 py-2 px-4 hover:bg-gray-200 transition-all duration-300 hover:text-black`}
                    href={'/user/purchase'}
                >
                   <MdOutlineEventNote size={20} />
                    Order
                </Link>

              { user?.role===ERole.USER  && <Link
                    className={`${
                        pathname.includes('favorite') && 'text-black'
                    } inline-flex gap-3 py-2 px-4 hover:bg-gray-200 transition-all duration-300 hover:text-black  `}
                    href={'/user/favorite'}
                >
                    <Star size={20} />
                    Favorite
                </Link>}

                <Link
                    className={`${
                        pathname.includes('address') && 'text-black'
                    } inline-flex gap-3 py-2 px-4 hover:bg-gray-200 transition-all duration-300 hover:text-black`}
                    href={'/user/address'}
                >
                    <MapPinHouse size={20} />
                    Address
                </Link>
              { user?.authBy===AuthBy.LOCAL &&  <Link
                    className={`${
                        pathname.includes('password') && 'text-black'
                    } inline-flex items-center gap-3 py-2 px-4 hover:bg-gray-200 transition-all duration-300 hover:text-black `}
                    href={'/user/password'}
                >
                    <KeyRound size={20} />
                    Change Password
                </Link>}
            </div>
        </aside>
    );
}
