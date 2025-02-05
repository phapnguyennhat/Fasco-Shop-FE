import type { Metadata } from 'next';
import { Poppins, Volkhov, Jost } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import StoreProvider from './StoreProvider';
import GoogleAuthProvider from '@/GoogleAuthProvider';
import { Toaster } from '@/components/ui/toaster';
import FacebookAuthProvider from '@/FacebookAuthProvider';


const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
    adjustFontFallback: false,
});

const jost = Jost({
    variable: '--font-jost',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
    adjustFontFallback: false,
});



const volkhov = Volkhov({
    variable: '--font-volkhov',
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    adjustFontFallback: false,
});

const digitalNumbers = localFont({
    src: [
        {
            path: './fonts/DigitalNumbers-Regular.ttf',
            style: 'normal',
        },
    ],
    variable: '--font-digital-numbers',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

  
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} font-poppins  ${volkhov.variable} ${digitalNumbers.variable}  ${jost.variable} antialiased`}
            >
                <StoreProvider>
                    {' '}
                    <GoogleAuthProvider>
                            <FacebookAuthProvider>
                                        {children}
                                        <Toaster />
                            </FacebookAuthProvider>
                    </GoogleAuthProvider>
                </StoreProvider>


                
            </body>
            
        </html>
    );
}
