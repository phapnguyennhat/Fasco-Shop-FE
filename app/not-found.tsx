import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <>
            <Navbar />
            <section className="pt-[80px] flex h-screen items-center justify-center md:pt-[120px] lg:pt-[180px]">
              <p className='  max-w-[600px] text-center' >This resouce failed to load. Please tap back and try again.</p>
            </section>
            <Footer />
        </>
    );
}
