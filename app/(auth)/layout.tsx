import Footer from '@/components/Footer';
import FollowUs from '../(root)/components/FollowUs';
import Subscribe from '../(root)/components/Subscribe';
import Navbar from '../components/Navbar';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar/>
            {children}
            <FollowUs />
            <Subscribe />
            <Footer />
        </>
    );
}
