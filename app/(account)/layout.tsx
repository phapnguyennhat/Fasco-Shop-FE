import Footer from '@/components/Footer';
import Navbar from '../components/Navbar';
import NavSide from './user/Components/NavSide';
import { getProfile } from '@/lib/api';

export default async  function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  const user = await getProfile()
    return (
        <>
            <Navbar />
            <section className=" flex max-w-[1200px] mx-auto pt-[80px] md:pt-[120px] lg:pt-[180px]">
                <NavSide user={user} />

                {children}
            </section>
            <Footer />
        </>
    );
}
