import Footer from "@/components/Footer";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <>
      <Navbar/>
      <div className=" pt-[80px] md:pt-[120px] lg:pt-[180px]">{children}</div>
      <Footer/>

    </>
  )
}
