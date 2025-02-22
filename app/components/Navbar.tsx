import Link from 'next/link';
import MenuSide from './MenuSide';
import { fetcher } from '@/lib/utils';
import getAuthCookies from '@/lib/getAuthCookie';
import Image from 'next/image';
import PageNav from './PageNav';
import { FIVEMINUTES } from '../common/constant';
import { getCart, getProfile } from '@/lib/api';

export default async function Navbar() {
    const [profile, cartItems] = await Promise.all([getProfile(), getCart()]);
    const navItems = ['Home', 'Deals', 'New Arrivals'];

    return (
        <>
            <nav className=" navbar">
               <div className=' px-3   absolute  -translate-x-1/2 left-1/2  max-w-[1280px] w-full flex items-center justify-between  '>
                    <Link href={'/'} className="  logo">
                        Fasco
                    </Link>
                    <ul className=" hidden lg:inline-flex items-center   gap-8">
                        {profile ? (
                            <>
                                <li>
                                    <Link href={'/'}>Home</Link>
                                </li>
                                <li>
                                    <Link href={'/shop'}>Shop</Link>
                                </li>
                                <li>
                                    <Link href={'/product'}>Products</Link>
                                </li>
                                <PageNav />
                            </>
                        ) : (
                            <>
                                {navItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
    
                                <li>
                                    <Link href={'/login'}>Sign in</Link>
                                </li>
                                <li className=" button-black">
                                    <Link href={'/register'}>Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
    
                    <MenuSide profile={profile} cartItems={cartItems} />
               </div>
            </nav>
        </>
    );
}
