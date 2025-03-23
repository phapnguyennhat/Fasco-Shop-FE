import Footer from '@/components/Footer';
import FollowUs from '../(root)/components/FollowUs';
import Subscribe from '../(root)/components/Subscribe';
import Navbar from '../components/Navbar';
import { Suspense } from 'react';
import ErrorBoundary from 'next/dist/client/components/error-boundary';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* <Navbar /> */}
            <div className=" pt-[90px] md:pt-[120px] lg:pt-[180px]">
                {children}
            </div>
            <FollowUs />
            <Subscribe />
            <Footer />
        </>
    );
}
