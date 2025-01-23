import Link from 'next/link';
import MenuSide from './MenuSide';
import { fetcher } from '@/lib/utils';
import getAuthCookies from '@/lib/getAuthCookie';
import Image from 'next/image';
import PageNav from './PageNav';
import { FIVEMINUTES } from '../common/constant';


export default async function Navbar() {
    let profile = undefined;

    try {
        const authCookie = await getAuthCookies();
        profile = await fetcher<User>('user/profile', {
            method: 'GET',
            headers: {
                Cookie: authCookie,
            },
            credentials: 'include',
            next: {
                revalidate: 0
            }
           
        });
    } catch (error) {
        profile = undefined;
    }
    const navItems = ['Home', 'Deals', 'New Arrivals'];

    return (
        <>
            <nav className=" navbar   ">
                <Link href={'/'} className=" logo">
                    Fasco
                </Link>
                <ul className=" hidden lg:inline-flex items-center  gap-8">
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

                   

                    <MenuSide profile={profile} />
            </nav>
        </>
    );
}
