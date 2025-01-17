import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import MenuSide from './MenuSide';

export default function Navbar() {
    return (
       <>
            <nav  className=" navbar  ">
                <span className=" logo">Fasco</span>
                <ul className=' hidden lg:inline-flex items-center  gap-8' >
                    <li>Home</li>
                    <li>Deals</li>
                    <li>New Arrivals</li>
                    {/* <li>Packages</li> */}
                    <li><Link href={'/login'}>Sign in</Link></li>
                    <li className=' button-black' >
                        <Link href={'/signup'}>Sign up</Link>
                    </li>
                </ul>
                <MenuSide/>
            </nav>
       </>

        
    );
}
